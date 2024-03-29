import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('NEW_POST', this.newPost)
      .on('DELETE_POST', this.deletePost)
      .on('NEW_MESSAGE', this.newMessage)
      .on('NEW_COMMENT', this.newComment)
  }

  onError(e) {
    logger.error('[SOCKET_ERROR]', e)
    Notification.toast(e.message, 'error')
  }

  newPost(payload) {
    AppState.posts.push(payload)
  }

  newComment(payload) {
    logger.log('NEW COMMENT', payload)
    AppState.comments = [payload, ...AppState.comments]
  }

  deletePost(payload) {
    logger.log(payload)
    const foundInd = AppState.posts.findIndex(p => p.id === payload.id)
    AppState.posts.splice(foundInd, 1)
  }

  newMessage(payload) {
    AppState.currentMessages.push(payload)
  }
}

export const socketService = new SocketService()
