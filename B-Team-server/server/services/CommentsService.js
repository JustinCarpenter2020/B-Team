import { dbContext } from '../db/DbContext'

class CommentsService {
  async getByPostId(id) {
    return await dbContext.Comments.find({ postId: id })
  }

  async getOne(id) {
    return await dbContext.Comments.find({ _id: id })
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }
}

export const commentsService = new CommentsService()
