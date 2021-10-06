import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getProfile(id) {
    await api.get('api/profiles/' + id)
  }
}

export const profilesService = new ProfilesService()
