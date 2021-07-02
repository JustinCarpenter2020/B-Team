import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async getComments(id) {
    const res = await api.get('api/posts/' + id + '/comments')
    AppState.comments = res.data
    logger.log(res.data)
  }

  async createComment(newComment) {
    const res = await api.post('api/comments', newComment)
    AppState.comments.push(res.data)
  }

  async like(id) {
    const res = await api.put('api/comments/' + id + '/like')
    const found = AppState.comments.findIndex(c => c.id === id)
    AppState.comments.splice(found, 1, res.data)
  }
}

export const commentsService = new CommentsService()
