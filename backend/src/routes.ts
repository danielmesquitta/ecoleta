import { Router } from 'express'

import pointsController from './controllers/pointsController'
import itemsController from './controllers/itemsController'

const routes = Router()

routes.post('/points', pointsController.store)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.get('/items', itemsController.index)

export default routes
