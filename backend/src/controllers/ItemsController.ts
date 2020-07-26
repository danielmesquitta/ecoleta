import { Response, Request } from 'express'

import knex from '../database/connection'

interface Item {
  id: number
  title: string
  image: string
}

export default {
  async index(req: Request, res: Response) {
    const items = await knex('items').select<Item[]>('*')

    const serializedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }))

    return res.json(serializedItems)
  },
}
