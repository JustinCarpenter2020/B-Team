import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class PostsService {
  async getAll() {
    return await dbContext.Posts.find().populate('Creator')
  }

  async getOne(id) {
    return await dbContext.Posts.findOne({ _id: id }).populate('Creator')
  }

  async create(body) {
    return await dbContext.Posts.create(body)
  }

  async edit(body) {
    const edited = await dbContext.Posts.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!edited) {
      throw new BadRequest('Invalid Id')
    }
    return edited
  }

  async delete(id, creatorId) {
    await dbContext.Posts.findOneAndDelete({ _id: id, creatorId: creatorId })
    return 'Delorted'
  }
}

export const postsService = new PostsService()
