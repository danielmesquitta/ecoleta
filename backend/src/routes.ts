import { Router } from 'express'

import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController'

const routes = Router()

routes.get('/items', ItemsController.index)

routes.post('/points', PointsController.store)
routes.get('/points/:id', PointsController.show)

export default routes
