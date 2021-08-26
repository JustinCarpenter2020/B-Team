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
  }

  onError(e) {
    logger.error('[SOCKET_ERROR]', e)
    Notification.toast(e.message, 'error')
  }

  newPost(payload) {
    AppState.posts.push(payload)
  }
}

export const socketService = new SocketService()
