import { dbContext } from '../db/DbContext'

class MessagesService {
  async getMessages(messageObject) {
    const messages = await dbContext.Messages.find(messageObject)
    if (!messages) {
      throw new Error('no current messages')
    }
    return messages
  }

  async createMessage(body) {
    const message = await dbContext.Messages.create(body)
    if (!message) {
      throw new Error('could not message')
    }
    return message
  }
}

export const messagesService = new MessagesService()
