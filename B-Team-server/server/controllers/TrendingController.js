import { trendingService } from '../services/TrendingService'
import BaseController from '../utils/BaseController'

export class TrendingController extends BaseController {
  constructor() {
    super('api/trending')
    this.router
      .get('', this.getTrending)
  }

  async getTrending(req, res, next) {
    try {
      res.send(await trendingService.getTrending())
    } catch (error) {
      next(error)
    }
  }
}
