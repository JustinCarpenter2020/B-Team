import { dbContext } from '../db/DbContext'

class PostsService {
  async getAll() {
    return await dbContext.Posts.find()
  }
}

export const postsService = new PostsService()
