import { AppState } from '../AppState'
import { api } from './AxiosService'

class TrendingService {
  async getTrending() {
    const res = await api.get('api/trending')
    AppState.trending = res.data
  }

  async getPeople() {
    const res = await api.get('api/trending/people')
    AppState.people = res.data
  }
}

export const trendingService = new TrendingService()
