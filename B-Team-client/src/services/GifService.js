import { apiKey } from '../env'
import { logger } from '../utils/Logger'
import { giphyApi } from './AxiosService'

class GifService {
  async getTrendingGifs() {
    const res = await giphyApi.get('trending?' + apiKey)
    logger.log(res.data)
  }
}

export const gifService = new GifService()
