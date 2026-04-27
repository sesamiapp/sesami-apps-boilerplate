import { Router } from 'express'
import { InstallationController } from './Installation.controller'


export const installationRouter: Router = Router()

installationRouter.post('/', InstallationController.initiateInstallation)

installationRouter.get('/authorization', InstallationController.authorization)
