import { AdminAppLoader, AdminAppointmentDetails, ExperienceConfirmationPage, ExperienceInstantBookingForm } from '@sesamiapp/app-message'
import { useEffect, useState } from 'react'

export const useSesami_AdminAppLoader = () => {
    const [Sesami, setSesami] = useState<AdminAppLoader | null>(null)
    useEffect(() => {
        (async () => {
            if(!Sesami){
                const sesamiInit = await AdminAppLoader.init()
                setSesami(sesamiInit as any)
            }
        })()
    }, [])
    return Sesami
}

export const useSesami_AdminAppointmentDetails = () => {
    const [Sesami, setSesami] = useState<AdminAppointmentDetails | null>(null)
    useEffect(() => {
        (async () => {
            if(!Sesami){
                const sesamiInit = await AdminAppointmentDetails.init()
                setSesami(sesamiInit as any)
            }
        })()
    }, [])
    return Sesami
}

export const useSesami_ExperienceIBForm = () => {
    const [Sesami, setSesami] = useState<ExperienceInstantBookingForm | null>(null)
    useEffect(() => {
        (async () => {
            if(!Sesami){
                const sesamiInit = await ExperienceInstantBookingForm.init()
                setSesami(sesamiInit as any)
            }
        })()
    }, [])
    return Sesami
}

export const useSesami_ExperienceConfirmation = () => {
    const [Sesami, setSesami] = useState<ExperienceConfirmationPage | null>(null)
    useEffect(() => {
        (async () => {
            if(!Sesami){
                const sesamiInit = await ExperienceConfirmationPage.init()
                setSesami(sesamiInit as any)
            }
        })()
    }, [])
    return Sesami
}
