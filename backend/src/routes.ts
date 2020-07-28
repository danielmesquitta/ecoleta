import { Router } from 'express'
import userController from './controllers/userController'

const routes = Router()

routes.get('/', userController.store)

export default routes
