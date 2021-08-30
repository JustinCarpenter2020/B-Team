import { Auth0Provider } from '@bcwdev/auth0provider'
import { messagesService } from '../services/MessagesService'
import BaseController from '../utils/BaseController'

export class MessagesController extends BaseController {
  constructor() {
    super('api/messages')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:to', this.getMessages)
      .post('', this.createMessage)
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
      res.send(await messagesService.createMessage(req.body))
    } catch (error) {
      next(error)
    }
  }
}
