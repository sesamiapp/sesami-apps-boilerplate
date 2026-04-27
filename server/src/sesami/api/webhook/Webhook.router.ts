import { Router } from 'express'
import { WebhookHandler } from './Webhook.handler';
import { ShopIdValidationMiddleware } from '../middlewares/ShopIdValidator.middleware';


export const webhookRoute: Router = Router()

webhookRoute.post('/webhooks',
    ShopIdValidationMiddleware,
    WebhookHandler.handle)

