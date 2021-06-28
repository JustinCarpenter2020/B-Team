import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TrendingService {
  async getTrending() {
    const res = await api.get('api/trending')
    logger.log(res.data)
    AppState.trending = res.data
  }
}

export const trendingService = new TrendingService()
