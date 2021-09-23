import { dbContext } from '../db/DbContext'
import { connectionService } from './ConnectionService'

class MessagesService {
  async getMessages(messageObject) {
    const messages = await dbContext.Messages.find(messageObject).populate('sender')
    if (!messages) {
      throw new Error('no current messages')
    }
    return messages
  }

  async createMessage(body) {
    // Create a query object to find if i'm already connected with this person
    const q = {
      $match: {
        $or: [{ user1: body.to, user2: body.from }, { user2: body.to, user1: body.from }]
      }
    }
    // find the connection, if there is none, create one
    const connection = await dbContext.Connections.aggregate([q])
    if (!connection) {
      // If the connection cannot be made it will error out in this service
      await connectionService.createConnection({ user1: body.from, user2: body.to })
    }
    // Otherwise we are good to create the message

    const message = await dbContext.Messages.create(body)
    if (!message) {
      throw new Error('could not message')
    }
    return message
  }
}

export const messagesService = new MessagesService()
