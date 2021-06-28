import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data
    logger.log(res.data)
  }

  async getOne(id) {
    const res = await api.get('api/posts/' + id)
    AppState.activePost = res.data
    logger.log(res.data)
  }
}

export const postsService = new PostsService()
