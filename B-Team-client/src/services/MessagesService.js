import { AppState } from '../AppState'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class MessagesService {
  async getMessages(id) {
    const res = await api.get('api/messages/' + id)
    logger.log(res)
    AppState.currentMessages = res.data
    router.push({ name: 'MessagePage', params: { id: id } })
  }

  async createMessage(newMessage) {
    const res = await api.post('api/messages', newMessage)
    AppState.currentMessages.push(res.data)
    AppState.activeGif = null
  }
}

export const messagesService = new MessagesService()
