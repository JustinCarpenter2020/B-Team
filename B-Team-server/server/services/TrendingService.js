import { dbContext } from '../db/DbContext'

class TrendingService {
  async getPeople() {
    const people = []
    for (let i = 0; i <= 2; i++) {
      const count = await dbContext.Account.countDocuments()
      const random = Math.floor(Math.random() * (count - 1))
      const names = await dbContext.Account.find({}).limit(2).skip(random)
      people.push(...names)
    }
    return people
  }

  async getTrending() {
    const hashTags = []
    for (let i = 0; i <= 5; i++) {
      const name = await this.getName()
      const statements = this.getJoinStatement()
      hashTags.push(`${name} ${statements.statement} ${statements.type === 'user' ? await this.getName() : this.getLocation()}`)
    }
    return hashTags
  }

  async getName() {
    const count = await dbContext.Account.countDocuments()
    const random = Math.floor(Math.random() * (count - 1))
    const account = await dbContext.Account.findOne({}).limit(1).skip(random)
    return account.name.split('@')[0]
  }

  getLocation() {
    const locations = ['Fast Eddies', 'wendys', 'public park', 'the Emmys', 'the nickelodeon kids choice awards', 'grandmas house', ' undisclosed location', 'waffleHouse', 'dennys parking lot', 'apple genius bar']
    const random = Math.floor(Math.random() * (locations.length - 1))
    return locations[random]
  }

  getJoinStatement() {
    const statements = [{ statement: 'bare knuckle boxed', type: 'user' }, { statement: 'made a public statement that they do live in a box near', type: 'location' }, { statement: 'was caught mingling at a', type: 'location' }, { statement: 'Landed a role as guard number 3!', type: 'closing' }]
    const random = Math.floor(Math.random() * (statements.length - 1))
    return statements[random]
  }
}

export const trendingService = new TrendingService()
