import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      // .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      // .put('/:id', this.edit)
      // .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      res.send(await postsService.getAll())
    } catch (error) {
      next(error)
    }
  }

  // async getOne(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      delete req.body.likes
      req.body.creatorId = req.userInfo.id
      res.send(await postsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  // async edit(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async delete(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
