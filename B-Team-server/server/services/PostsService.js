import { dbContext } from '../db/DbContext'

class PostsService {
  async getAll() {
    return await dbContext.Posts.find().populate('Creator')
  }

  async create(body) {
    return await dbContext.Posts.create(body)
  }
}

export const postsService = new PostsService()
