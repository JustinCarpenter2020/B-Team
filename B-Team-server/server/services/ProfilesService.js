import { dbContext } from '../db/DbContext'

class ProfilesService {
  async getProfileById(id) {
    const profile = await dbContext.Account.findOne({ _id: id })
    if (!profile) {
      throw new Error('Invalid Id')
    }
    return profile
  }

  async getPostsByProfileId(id) {
    const posts = await dbContext.Posts.find({ creatorId: id }).sort('-createdAt')
    if (!posts) {
      throw new Error('This user has no posts')
    }
    return posts
  }
}

export const profilesService = new ProfilesService()
