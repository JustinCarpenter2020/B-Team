import { dbContext } from '../db/DbContext'

class TrendingService {
  async getTrending() {
    // const names = await this.getNames()
    const locations = ['Fast Eddies', 'the back of a wendys', 'a public park', 'the emmys', 'the nickelodeon kids choice awards', 'their grandmas house', 'an undisclosed location', 'in the back of ryan goslings car', 'a dennys parking lot']

    const output = []
    for (let i = 0; i <= 5; i++) {
      const names = await this.getNames()
      const actions = [`${names[0]} got Mistaken for ${names[1]}`, `${names[0]} filed a cease and assist against ${names[1]}`, `${names[0]} landed a role as guard #3`, `${names[1]} was held captive by ${names[0]} at ${locations[Math.floor(Math.random() * (locations.length - 1))]}`, `${names[1]} was spotted mingling at ${locations[Math.floor(Math.random() * (locations.length - 1))]}`, `${names[0]} makes a public statement that they do live in a box near ${locations[Math.floor(Math.random() * (locations.length - 1))]}`]
      output.push(actions[Math.floor(Math.random() * (actions.length - 1))])
    }

    return output
  }

  async getNames() {
    const names = []
    const count = await dbContext.Account.count()
    const random = Math.floor(Math.random() * (count - 1))
    const name = await dbContext.Account.find({}).limit(2).skip(random)
    name.forEach(n => names.push(n.name.split('@')[0]))
    return names
  }
}

export const trendingService = new TrendingService()
