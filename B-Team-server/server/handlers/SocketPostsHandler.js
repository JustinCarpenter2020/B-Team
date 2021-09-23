import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'

export class SocketPostsHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('NEW_POST', this.newPost)
      .on('DELETE_POST', this.deletePost)
      // .on("NEW_MESSAGE", this.new)
  }

  async newPost(payload) {
    this.socket.emit('NEW_POST', payload)
  }

  deletePost(payload) {
    logger.log(payload)
    this.socket.emit('DELETE_POST', payload)
  }
}
