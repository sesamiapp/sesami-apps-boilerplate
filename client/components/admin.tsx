import { useEffect, useMemo, useReducer, useState } from 'react';
import { Modal, Typography, message } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdProvider, useSesami_AdminAppLoader } from '../hooks';
import {
    apiRequest,
    createResourceRequest,
    retrieveServicesRequest,
} from '../api';
import {
    DEFAULT_COUNTRY_CODE,
    GUIDE_TEXT,
    MOCK_HOME_HOLIDAYS,
    MOCK_SERVICES,
} from './admin/constants';
import { getCountryOptions, getHolidaysByDate } from './admin/holiday-data';
import { AddHolidayHeader } from './admin/steps/add-holiday/header';
import { AddHolidayPanel } from './admin/steps/add-holiday/panel';
import { ChooseServiceHeader } from './admin/steps/choose-service/header';
import { ChooseServicePanel } from './admin/steps/choose-service/panel';
import { HomeHeader } from './admin/steps/home/header';
import { HomePanel } from './admin/steps/home/panel';
import { createInitialState, reducer } from './admin/state';
import { styles } from './admin/styles';

const { Text } = Typography;

const queryClient = new QueryClient();

export const Admin = () => (
    <QueryClientProvider client={queryClient}>
        <AntdProvider>
            <AdminContent />
        </AntdProvider>
    </QueryClientProvider>
);

const AdminContent = () => {
    const Sesami = useSesami_AdminAppLoader();

    const currentYear = new Date().getFullYear();
    const countryOptions = useMemo(() => getCountryOptions(), []);
    const initialCountryCode = countryOptions.some(
        ({ value }) => value === DEFAULT_COUNTRY_CODE,
    )
        ? DEFAULT_COUNTRY_CODE
        : (countryOptions[0]?.value ?? DEFAULT_COUNTRY_CODE);

    const [state, dispatch] = useReducer(
        reducer,
        createInitialState(currentYear, initialCountryCode),
    );
    const [services, setServices] = useState(MOCK_SERVICES);
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    const [isCreatingResource, setIsCreatingResource] = useState(false);
    const holidaysByDate = useMemo(
        () => getHolidaysByDate(state.selectedCountryCode, state.selectedYear),
        [state.selectedCountryCode, state.selectedYear],
    );

    if (!Sesami) {
        return 'loading...';
    }

    const openGuide = () => dispatch({ type: 'SET_GUIDE_OPEN', open: true });

    const closeGuide = () => dispatch({ type: 'SET_GUIDE_OPEN', open: false });

    const handleConnect = async () => {
        dispatch({ type: 'SET_CONNECTING', connecting: true });

        try {
            await apiRequest(Sesami.getToken)(
                '/api/v1/holiday/connect',
                'POST',
                JSON.stringify({
                    shopId: Sesami.getShopId(),
                    year: state.selectedYear,
                    countryCode: state.selectedCountryCode,
                    services: state.selectedServiceIds,
                }),
            );
            message.success('Holiday setup connected');
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Connect request failed';
            message.error(errorMessage);
        } finally {
            dispatch({ type: 'SET_CONNECTING', connecting: false });
            dispatch({ type: 'SET_STEP', step: 'home' });
        }
    };

    const handleCreateResource = async () => {
        setIsCreatingResource(true);
        try {
            await createResourceRequest(Sesami.getToken, {
                shop: Sesami.getShopId(),
                payload: {
                    typeId: 'REPLACE_TYPE_ID',
                    name: 'REPLACE_RESOURCE_NAME',
                    timezone: 'REPLACE_TIMEZONE',
                    status: true,
                    email: 'REPLACE_EMAIL',
                    image: 'REPLACE_IMAGE_URL',
                    availabilities: [],
                    availabilitiesRange: {},
                    description: 'REPLACE_DESCRIPTION',
                    eventDescription: 'REPLACE_EVENT_DESCRIPTION',
                    mobile: 'REPLACE_MOBILE',
                    notificationEmailStatus: true,
                },
            });
            message.success('Create resource request sent');
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Create resource request failed';
            message.error(errorMessage);
        } finally {
            setIsCreatingResource(false);
            dispatch({ type: 'SET_STEP', step: 'chooseService' });
        }
    };

    useEffect(() => {
        if (state.step !== 'chooseService') {
            return;
        }

        let isActive = true;
        const fetchServices = async () => {
            setIsLoadingServices(true);
            try {
                const response = await retrieveServicesRequest(Sesami.getToken, {
                    shop: Sesami.getShopId(),
                    limit: 10,
                    after: undefined,
                    before: undefined,
                    searchTerm: undefined,
                    status: undefined,
                });
                if (!isActive) {
                    return;
                }

                const fetchedServices = mapServicesResponse(response);
                setServices(fetchedServices);
            } catch (error) {
                if (!isActive) {
                    return;
                }
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Retrieve services request failed';
                message.error(errorMessage);
                setServices([]);
            } finally {
                if (isActive) {
                    setIsLoadingServices(false);
                }
            }
        };

        void fetchServices();
        return () => {
            isActive = false;
        };
    }, [Sesami, state.step]);

    const renderHeader = () => {
        if (state.step === 'home') {
            return (
                <HomeHeader
                    onGuide={openGuide}
                    onApplyHoliday={() =>
                        dispatch({ type: 'SET_STEP', step: 'addHoliday' })
                    }
                />
            );
        }

        if (state.step === 'addHoliday') {
            return (
                <AddHolidayHeader
                    selectedCountryCode={state.selectedCountryCode}
                    countryOptions={countryOptions}
                    onCountryChange={(countryCode) =>
                        dispatch({ type: 'SET_COUNTRY', countryCode })
                    }
                    creatingResource={isCreatingResource}
                    onGuide={openGuide}
                    onCancel={() => dispatch({ type: 'SET_STEP', step: 'home' })}
                    onCreate={handleCreateResource}
                />
            );
        }

        return (
            <ChooseServiceHeader
                connecting={state.connecting}
                onGuide={openGuide}
                onDoLater={() => dispatch({ type: 'SET_STEP', step: 'home' })}
                onConnect={handleConnect}
            />
        );
    };

    const renderHomePanel = () => {
        return <HomePanel holidays={MOCK_HOME_HOLIDAYS} />;
    };

    const renderAddHolidayPanel = () => {
        return (
            <AddHolidayPanel
                selectedYear={state.selectedYear}
                holidaysByDate={holidaysByDate}
            />
        );
    };

    const renderChooseServicePanel = () => {
        return (
            <ChooseServicePanel
                selectedYear={state.selectedYear}
                holidaysByDate={holidaysByDate}
                selectedServiceIds={state.selectedServiceIds}
                services={services}
                isLoadingServices={isLoadingServices}
                onServicesChange={(serviceIds) =>
                    dispatch({ type: 'SET_SERVICES', serviceIds })
                }
            />
        );
    };

    const renderPanel = () => {
        if (state.step === 'home') {
            return renderHomePanel();
        }

        if (state.step === 'addHoliday') {
            return renderAddHolidayPanel();
        }

        return renderChooseServicePanel();
    };

    return (
        <div style={{ ...styles.page, ...localStyles.page }}>
            <div style={styles.headerSection}>{renderHeader()}</div>
            <div style={styles.panelSection}>{renderPanel()}</div>

            <Modal
                title="Guide"
                open={state.guideOpen}
                onCancel={closeGuide}
                footer={null}
            >
                <Text>{GUIDE_TEXT}</Text>
            </Modal>
        </div>
    );
};

const localStyles = {
    page: {},
};

const mapServicesResponse = (
    response: any,
): Array<{ id: string; label: string }> => {
    if (!response || !Array.isArray(response.data)) {
        return [];
    }

    return response.data
        .map((service: any) => ({
            id: String(service?.id ?? ''),
            label: String(
                service?.name ??
                    service?.title ??
                    service?.description ??
                    service?.id ??
                    '',
            ),
        }))
        .filter((service: { id: string; label: string }) => service.id.length > 0);
};

export default Admin;
