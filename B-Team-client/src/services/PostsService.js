import { AppState } from '../AppState'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('/api/posts')
    AppState.posts = res.data
    logger.log(res.data)
  }

  async getOne(id) {
    const res = await api.get('api/posts/' + id)
    AppState.activePost = res.data
    logger.log(res.data)
  }

  async create(post) {
    logger.log(post)
    const res = await api.post('api/posts', post)
    return res.data.id
  }

  async like(id) {
    const res = await api.put('api/posts/' + id + '/like')
    const foundInd = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(foundInd, 1, res.data)
    if (AppState.activePost.id === id) {
      AppState.activePost = res.data
    }
  }

  async deletePost(id) {
    await api.delete('api/posts/' + id)
    router.push({ name: 'Home' })
  }
}

export const postsService = new PostsService()
