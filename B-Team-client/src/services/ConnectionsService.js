import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ConnectionsService {
  async getConnections() {
    const res = await api.get('api/connections')
    AppState.connections = res.data
  }

  async newConnection(myId, id) {
    await api.post('api/connections', { from: myId, to: id })
    // AppState.connections.push(res.data)
  }
}

export const connectionsService = new ConnectionsService()
