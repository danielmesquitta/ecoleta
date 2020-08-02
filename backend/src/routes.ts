import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'
import pointsController from './controllers/pointsController'
import itemsController from './controllers/itemsController'

const routes = Router()
const upload = multer(multerConfig)

routes.post('/points', upload.single('image'), pointsController.store)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.get('/items', itemsController.index)

export default routes
