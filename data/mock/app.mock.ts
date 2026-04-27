import { AppTarget } from '@sesamiapp/app-message'
import { App } from '../../types'

export const app: App = {
    id: '66b38370ef71c2d92afb9a00',
    name: 'SesamiApp',
    title: 'Sesami App',
    icon: {
        id: null,
        path: null
    },
    description: 'The best app!',
    extensions: [
        {
            id: 'someRandomAppId',
            name: 'My Extension',
            target: AppTarget.EXPERIENCE_INSTANT_BOOKING_FORM,
            url: '/experience/instantBooking'
        }
    ]
}
