import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      // .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      // .put('/:id', this.edit)
      // .put('/:id/like', this.like)
      // .delete('/:id', this.delete)
  }

  // async getOne(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      delete req.body.commentLikes
      req.body.creatorId = req.userInfo.id
      res.send(await commentsService.create(req.body))
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

  // async like(req, res, next) {
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
