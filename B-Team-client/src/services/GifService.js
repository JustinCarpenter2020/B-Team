import { AppState } from '../AppState'
import { apiKey } from '../env'
import { Gif } from '../models/Gif'
import { logger } from '../utils/Logger'
import { giphyApi } from './AxiosService'

class GifService {
  async getTrendingGifs() {
    const res = await giphyApi.get('trending?limit=30&' + apiKey)
    AppState.gifs = res.data.data.map(g => new Gif(g))
  }

  async searchGifs(query) {
    AppState.gifs = []
    const res = await giphyApi.get('search?limit=30&' + apiKey + '&q=' + query)
    logger.log(res.data.data)
    AppState.gifs = res.data.data.map(g => new Gif(g))
  }
}

export const gifService = new GifService()
