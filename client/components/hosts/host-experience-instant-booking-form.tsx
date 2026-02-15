import { useEffect, useRef, useState } from 'react'
import { nanoId } from '../../helpers'
import { ExperienceHostInstantBookingForm } from '@sesamiapp/app-message'
import * as mock from '../../../data/mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AntdProvider } from '../../hooks'

/*
    The Experience instant booking wrapper.
*/

const queryClient = new QueryClient()

export const HostExperienceIBForm = () => (
    <QueryClientProvider client={queryClient}>
        <AntdProvider>
            <HostExperienceIBFormContent/>
        </AntdProvider>
    </QueryClientProvider>
)

const HostExperienceIBFormContent = () => {

    //hooks:
    const iframe = useRef<HTMLIFrameElement>(null)

    //state:
    const [ timestamp ] = useState((new Date()).getTime())
    const [ messageId ] = useState(nanoId([mock.app.extensions[0].url, timestamp, mock.shop.locale], 8))
    const [ client, setClient ] = useState<ExperienceHostInstantBookingForm | null>(null)
    const [ height, setHeight ] = useState(0)

    //startup:
    useEffect(() => {
        if(iframe.current && !client){
            const cl = new ExperienceHostInstantBookingForm({
                messageId,
                url: mock.app.extensions[0].url,
                sessionId: 'someRandomSessionId',
                shopId: mock.shop.shopId,
                serviceId: mock.services[0].id,
                variantId: 'someRandomVariantId',
                quantity: 1,
                resources: mock.resources,
                locale: mock.shop.locale,
                timezone: mock.shop.timezone,
                slot: new Date(),
                onInitEnded: () => {},
                onHeightChange: setHeight
            })
            setClient(cl)
        }
    }, [iframe])

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            gap: 20
        }}>

            <div style={{ width: '100%' }}>

                <h2>Experience(wrapper)</h2>
            
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 20
                    }}
                >
                    
                    {/* load the extension inside an iframe */}
                    <iframe
                        ref={iframe}
                        src={client?.getURL() ?? undefined}
                        style={{
                            width: '100%',
                            height,
                            border: 'solid 1px #aaa',
                            borderRadius: 10
                        }}
                    />

                    <button
                        style={{
                            width: '100%',
                            height: 40,
                            borderRadius: 8,
                            background: '#333',
                            color: 'white',
                            fontSize: 16,
                            cursor: 'pointer'
                        }}
                        onClick={async () => {
                            const response = await client?.askForConfirm()
                            if(response){
                                alert('Experience: Extension confirmed!')
                            }
                        }}
                    >
                        Confirm
                    </button>

                </div>

            </div>

            <a href="/" style={{ color: '#333' }} >
                Go to Admin app home target
            </a>

        </div>
    )
}
