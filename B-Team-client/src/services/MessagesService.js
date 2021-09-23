import { AppState } from '../AppState'
import { api } from './AxiosService'

class MessagesService {
  async getConnections() {
    const res = await api.get('api/messages')
    AppState.connections = res.data
  }
}

export const messagesService = new MessagesService()
