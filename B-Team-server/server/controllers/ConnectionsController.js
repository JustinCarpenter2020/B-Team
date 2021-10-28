import { connectionService } from '../services/ConnectionService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class ConnectionsController extends BaseController {
  constructor() {
    super('api/connections')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUsers)
      .post('', this.createConnection)
  }

  async getUsers(req, res, next) {
    try {
      res.send(await connectionService.getConnections(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async createConnection(req, res, next) {
    try {
      res.send(await connectionService.createConnection({ user1: req.body.from, user2: req.body.to }))
    } catch (error) {
      next(error)
    }
  }
}
