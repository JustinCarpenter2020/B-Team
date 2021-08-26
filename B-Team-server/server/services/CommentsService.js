import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getByPostId(id) {
    return await dbContext.Comments.find({ postId: id }).populate('creator')
  }

  async getOne(id) {
    return await dbContext.Comments.findOne({ _id: id }).populate('creator')
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async edit(body) {
    const original = await this.getOne(body.id)
    body.commentLikes = original.commentLikes
    const edited = await dbContext.Comments.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!edited) {
      throw new BadRequest('Invalid Id')
    }
    return edited
  }

  async like(id, creatorId) {
    const found = await this.getOne(id)
    const liked = found.commentLikes.find(l => l === creatorId)
    if (!liked) {
      found.commentLikes.push(creatorId)
    } else {
      found.commentLikes = found.commentLikes.filter(l => l !== creatorId)
    }
    await found.save()
    return found
  }

  async delete(id, creatorId) {
    await dbContext.Comments.findOneAndDelete({ _id: id, creatorId: creatorId })
    return 'delorted'
  }
}

export const commentsService = new CommentsService()
