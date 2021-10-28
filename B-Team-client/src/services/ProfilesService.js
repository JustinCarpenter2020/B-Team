
import { api } from './AxiosService'
import { AppState } from '../AppState'

class ProfilesService {
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }
}

export const profilesService = new ProfilesService()
