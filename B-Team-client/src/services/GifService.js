import { AppState } from '../AppState'
import { apiKey } from '../env'
import { Gif } from '../models/Gif'
import { giphyApi } from './AxiosService'

class GifService {
  async getTrendingGifs() {
    const res = await giphyApi.get('trending?' + apiKey)
    AppState.gifs = res.data.data.map(g => new Gif(g))
  }
}

export const gifService = new GifService()
