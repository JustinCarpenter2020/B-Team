import { dbContext } from '../db/DbContext'

class ConnectionService {
  async getConnections(id) {
    // const q = {
    //   $match: {
    //     $or: [{ user1: id }, { user2: id }]
    //   }
    // }
    // const connections = await dbContext.Connections.aggregate([q])
    //   .project('friend')
    //   .collation({ locale: 'en_US', strength: 1 })
    //   .exec()
    // if (!connections) {
    //   throw new Error('failed to find connections')
    // }
    // return connections
    return await dbContext.Connections.find()
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
