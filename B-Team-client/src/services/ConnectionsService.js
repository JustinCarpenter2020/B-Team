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

  async unFollow(id) {
    const res = await api.delete('api/connections/' + id)
    logger.log(res.data)
    const index = AppState.connections.findIndex(c => c.id === id)
    AppState.connections.splice(index, 1, 0)
  }
}

export const connectionsService = new ConnectionsService()
