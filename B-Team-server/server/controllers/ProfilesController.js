import { profilesService } from '../services/ProfilesService'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('/:id', this.getProfileById)
  }

  async getProfileById(req, res, next) {
    try {
      res.send(await profilesService.getProfileById(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
