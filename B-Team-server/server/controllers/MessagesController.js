import { Auth0Provider } from '@bcwdev/auth0provider'
import { connectionService } from '../services/ConnectionService'
import { messagesService } from '../services/MessagesService'
import { socketProvider } from '../SocketProvider'
import BaseController from '../utils/BaseController'

export class MessagesController extends BaseController {
  constructor() {
    super('api/messages')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUsers)
      .get('/:to', this.getMessages)
      .post('', this.createMessage)
  }

  async getUsers(req, res, next) {
    try {
      res.send(await connectionService.getConnections(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getMessages(req, res, next) {
    try {
      const messageObject = {
        $and: [
          { $or: [{ to: req.params.to }, { from: req.params.to }] },
          { $or: [{ to: req.userInfo.id }, { from: req.userInfo.id }] }
        ]
      }
      res.send(await messagesService.getMessages(messageObject))
    } catch (error) {
      next(error)
    }
  }

  async createMessage(req, res, next) {
    try {
      req.body.from = req.userInfo.id
      const newMessage = await messagesService.createMessage(req.body)
      socketProvider.messageUser(req.body.to, 'NEW_MESSAGE', newMessage)
      res.send(newMessage)
    } catch (error) {
      next(error)
    }
  }
}
