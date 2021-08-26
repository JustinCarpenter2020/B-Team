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
  }

  async newPost(payload) {
    this.socket.emit('NEW_POST', payload)
  }
}
