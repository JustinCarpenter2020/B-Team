import { dbContext } from '../db/DbContext'

class ProfilesService {
  async getProfileById(id) {
    const profile = await dbContext.Account.findOne({ _id: id })
    if (!profile) {
      throw new Error('Invalid Id')
    }
    return profile
  }
}

export const profilesService = new ProfilesService()
