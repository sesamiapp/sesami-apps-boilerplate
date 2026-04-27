import { NotificationType } from '@sesamiapp/app-message'
import { message } from 'antd'

export const showMessage = (content: string, type: NotificationType) => {
    switch(type){
        case NotificationType.SUCCESS:
            message.success(content)
            break
        case NotificationType.INFO:
            message.info(content)
            break
        case NotificationType.WARNING:
            message.warning(content)
            break
        case NotificationType.ERROR:
            message.error(content)
            break
    }
}
