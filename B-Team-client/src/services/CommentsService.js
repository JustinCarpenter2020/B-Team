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
    await api.post('api/comments', newComment)

    // AppState.comments = [res.data, ...AppState.comments]
    logger.log(AppState.comments)
  }

  async like(id) {
    const res = await api.put('api/comments/' + id + '/like')
    const found = AppState.comments.findIndex(c => c.id === id)
    AppState.comments.splice(found, 1, res.data)
  }

  async deleteComment(id) {
    await api.delete('api/comments/' + id)
    const foundInd = AppState.comments.findIndex(c => c.id === id)
    AppState.comments.splice(foundInd, 1)
  }
}

export const commentsService = new CommentsService()
