import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class PostsService {
  async getAll(query) {
    return await dbContext.Posts.find(query).sort('-createdAt').populate('creator')
  }

  async getOne(id) {
    return await dbContext.Posts.findOne({ _id: id }).populate('creator')
  }

  async create(body) {
    const post = await dbContext.Posts.create(body)
    await post.populate('creator')
    return post
  }

  async edit(body) {
    const original = await this.getOne(body.id)
    body.likedIds = original.likedIds
    const edited = await dbContext.Posts.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!edited) {
      throw new BadRequest('Invalid Id')
    }
    return edited
  }

  async like(id, creatorId) {
    const post = await this.getOne(id)
    const liked = post.likedIds.find(i => i === creatorId)
    if (!liked) {
      post.likedIds.push(creatorId)
    } else {
      post.likedIds = post.likedIds.filter(i => i !== creatorId)
    }
    await post.save()
    return post
  }

  async delete(id, creatorId) {
    const found = await dbContext.Posts.findOneAndDelete({ _id: id, creatorId: creatorId })
    if (!found) {
      throw new BadRequest('Invalid Id, or you are not the creator')
    }
    return found
  }
}

export const postsService = new PostsService()
