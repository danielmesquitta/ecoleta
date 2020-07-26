import { Request, Response, response } from 'express'

import knex from '../database/connection'

interface StoreRequestBody {
  name: string
  email: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf: string
  items: number[]
}

export default {
  async store(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    }: StoreRequestBody = req.body
    const trx = await knex.transaction()
    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
    const insertedIds = await trx('points').insert(point)
    const point_id = insertedIds[0]
    const pointItems = items.map(item_id => ({
      item_id,
      point_id,
    }))
    await trx('point_items').insert(pointItems)
    return res.json({
      id: point_id,
      ...point,
    })
  },

  async show(req: Request, res: Response) {
    const { id } = req.params
    const trx = await knex.transaction()

    const point = await trx('points').where('id', id).first()
    if (!point) {
      return res.status(400).json({ error: 'Point not found' })
    }
    return res.json(point)
  },
}
