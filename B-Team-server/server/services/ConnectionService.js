import { dbContext } from '../db/DbContext'

class ConnectionService {
  async getConnections(id) {
    const connections = await dbContext.Connections.find({ $or: [{ user1: id }, { user2: id }] }).populate('sender').populate('receiver')
    if (!connections) {
      throw new Error('failed to find connections')
    }
    return connections
  }

  async createConnection(connection) {
    const newConnection = await dbContext.Connections.create(connection)
    if (!newConnection) {
      throw new Error('failed to connect')
    }
    return newConnection
  }
}

export const connectionService = new ConnectionService()
