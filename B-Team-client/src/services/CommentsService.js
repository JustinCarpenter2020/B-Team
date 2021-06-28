import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async getComments(id) {
    const res = await api.get('api/posts/' + id + '/comments')
    AppState.comments = res.data
    logger.log(res.data)
  }
}

export const commentsService = new CommentsService()
