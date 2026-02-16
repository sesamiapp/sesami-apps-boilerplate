import { useEffect, useRef, useState } from 'react';
import { nanoId, showMessage } from '../../helpers';
import * as mock from '../../../data/mock';
import { AdminHostAppLoader } from '@sesamiapp/app-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdProvider } from '../../hooks';

/*
    The Admin Portal wrapper.
*/

const queryClient = new QueryClient();

export const HostAdminAppLoader = () => (
    <QueryClientProvider client={queryClient}>
        <AntdProvider>
            <HostAdminAppLoaderContent />
        </AntdProvider>
    </QueryClientProvider>
);

const HostAdminAppLoaderContent = () => {
    const iframe = useRef<HTMLIFrameElement>(null);

    //state:
    const [timestamp] = useState(new Date().getTime());
    const [messageId] = useState(
        nanoId([mock.app.id, timestamp, mock.shop.locale], 8),
    );
    const [client, setClient] = useState<AdminHostAppLoader | null>(null);
    const [height, setHeight] = useState(0);

    //startup:
    useEffect(() => {
        if (iframe.current && !client) {
            const cl = new AdminHostAppLoader({
                messageId,
                shopId: mock.shop.shopId,
                locale: mock.shop.locale,
                onInitEnded: () => {},
                getToken: async () => 'someRandomToken',
                onHeightChange: setHeight,
                onNotification: showMessage,
            });
            setClient(cl);
        }
    }, [iframe]);

    const url = `/?appId=${mock.app.id}&locale=${mock.shop.locale}&messageId=${messageId}&shopId=${mock.shop.shopId}&target=ADMIN_APP_LOADER&timestamp=${timestamp}&token=${'someRandomToken'}&hmac=${'someRandomHmac'}`;

    return (
        <div
            style={{
                height: '100vh',
                width: '100wh',
                display: 'flex',
            }}
        >
            <div style={{ flex: 1 }}>
                <iframe
                    ref={iframe}
                    src={client && url ? url : undefined}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                />
            </div>
        </div>
    );
};
