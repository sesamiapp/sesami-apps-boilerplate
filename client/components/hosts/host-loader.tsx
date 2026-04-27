import { AppTarget } from '@sesamiapp/app-message'
import { PropsWithChildren } from 'react'
import { HostAdminAppLoader } from './host-admin-app-loader'
import { HostExperienceIBForm } from './host-experience-instant-booking-form'
import { worker } from '../../msw/msw-node'

/*
    This is a wrapper component that simulates loading the app inside a provider(Admin for example)
    and will load automatically outside your components during development.
    When you are on dev mode, it activates the MSW to mock the API calls to the Admin.
*/

worker.start({
    onUnhandledRequest: 'bypass',
})

const HostLoader = ({ target, children }: PropsWithChildren<{ target: AppTarget }>) => {
    if(!window.location.href.includes('messageId')){ // first load: wrapper
        switch(target){
            case AppTarget.ADMIN_APP_LOADER:
                return <HostAdminAppLoader/>
            case AppTarget.EXPERIENCE_INSTANT_BOOKING_FORM:
                return <HostExperienceIBForm/>
            default:
                return <a>404 - Not found!</a>
        }
    }else{ // app/extension
        return children
    }
}

export default HostLoader
