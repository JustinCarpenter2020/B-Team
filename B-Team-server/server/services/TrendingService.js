import { dbContext } from '../db/DbContext'

class TrendingService {
  async getTrending() {
    const names = await this.getNames()
    return names
  }

  async getNames() {
    const names = []
    const count = await dbContext.Account.count()
    const random = Math.floor(Math.random() * count)
    const name = await dbContext.Account.find({}).limit(2).skip(random)
    name.forEach(n => names.push(n.name))
    return names
  }
}

export const trendingService = new TrendingService()
