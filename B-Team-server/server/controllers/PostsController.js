import { postsService } from '../services/PostsService'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { socketProvider } from '../SocketProvider'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .put('/:id/like', this.like)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      res.send(await postsService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await postsService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      res.send(await commentsService.getByPostId(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      delete req.body.likedIds
      req.body.creatorId = req.userInfo.id
      const post = await postsService.create(req.body)
      post.creator = req.userInfo
      res.send(post)
      socketProvider.message('NEW_POST', post)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await postsService.edit(req.body))
    } catch (error) {
      next(error)
    }
  }

  async like(req, res, next) {
    try {
      res.send(await postsService.like(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const post = await postsService.delete(req.params.id, req.userInfo.id)
      res.send(post)
      socketProvider.message('DELETE_POST', post)
    } catch (error) {
      next(error)
    }
  }
}
