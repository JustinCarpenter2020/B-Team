export class Gif {
  constructor(data) {
    this.url = data.images ? data.images.downsized_large.url : ''
    this.type = data.type || ''
  }
}
