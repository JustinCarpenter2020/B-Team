import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class MessagesService {
  async getConnections() {
    const res = await api.get('api/messages')
    AppState.connections = res.data
  }

  async getMessages(id) {
    const res = await api.get('api/messages/' + id)
    logger.log(res)
    AppState.currentMessages = res.data
  }
}

export const messagesService = new MessagesService()
