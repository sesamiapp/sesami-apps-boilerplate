import { useEffect, useMemo, useReducer, useState } from 'react';
import { Modal, Typography, message } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdProvider, useSesami_AdminAppLoader } from '../hooks';
import { apiRequest } from '../api';
import {
    createResourceRequest,
    retrieveResourcesRequest,
    retrieveServiceByIdRequest,
    retrieveServicesRequest,
    updateServiceRequest,
} from '../sesami-api/sesami.api';
import {
    DEFAULT_COUNTRY_CODE,
    GUIDE_TEXT,
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

interface HomeResourceRow {
    id: string;
    cursor: string;
    name: string;
    type: string;
    timezone: string;
    status: boolean;
    email: string;
    mobile: string;
    shopId: string;
    description: string;
    eventDescription: string;
}

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
    const [resources, setResources] = useState<HomeResourceRow[]>([]);
    const [services, setServices] = useState<Array<{ id: string; label: string }>>(
        [],
    );
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    const [isCreatingResource, setIsCreatingResource] = useState(false);
    const holidaysByDate = useMemo(
        () => getHolidaysByDate(state.selectedCountryCode, state.selectedYear),
        [state.selectedCountryCode, state.selectedYear],
    );

    useEffect(() => {
        let isActive = true;

        const fetchResources = async () => {
            try {
                const response = await retrieveResourcesRequest({
                    limit: 50,
                });
                if (!isActive) {
                    return;
                }

                const fetchedResources = mapResourcesResponse(response);
                setResources(fetchedResources);
            } catch (error) {
                if (!isActive) {
                    return;
                }
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Retrieve resources request failed';
                message.error(errorMessage);
                setResources([]);
            }
        };

        void fetchResources();
        return () => {
            isActive = false;
        };
    }, []);

    useEffect(() => {
        if (state.step !== 'chooseService') {
            return;
        }

        let isActive = true;
        const fetchServices = async () => {
            setIsLoadingServices(true);
            try {
                const response = await retrieveServicesRequest({
                    limit: 50,
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
    }, [state.step]);

    if (!Sesami) {
        return 'loading...';
    }

    const openGuide = () => dispatch({ type: 'SET_GUIDE_OPEN', open: true });

    const closeGuide = () => dispatch({ type: 'SET_GUIDE_OPEN', open: false });

    const handleConnect = async () => {
        dispatch({ type: 'SET_CONNECTING', connecting: true });

        try {
            if (!state.createdResourceId) {
                message.error('No created resource to connect. Create the resource first.');
                return;
            }
            const createdResourceId = state.createdResourceId;
            if (state.selectedServiceIds.length === 0) {
                message.error('No services selected.');
                return;
            }

            for (const serviceId of state.selectedServiceIds) {
                const service = await retrieveServiceByIdRequest({ id: serviceId });
                const locations: any[] = Array.isArray(service?.locations) ? service.locations : [];

                if (locations.length === 0) {
                    throw new Error(`Service ${serviceId} has no locations to attach resources to`);
                }

                const nextLocationResources = locations.map((loc) => {
                    const existing: any[] = Array.isArray(loc?.resources) ? loc.resources : [];
                    const typeId = state.resourceDraft.typeId.trim();
                    const existingIdx = existing.findIndex((r) => r?.typeId === typeId);

                    if (existingIdx === -1) {
                        return {
                            locationId: String(loc?.locationId ?? ''),
                            resources: [
                                ...existing,
                                {
                                    typeId,
                                    isSelectable: false,
                                    blocksDuringAppointment: true,
                                    ids: [createdResourceId],
                                    hideAnyAvailable: false,
                                },
                            ],
                        };
                    }

                    const current = existing[existingIdx]!;
                    const ids = Array.isArray(current.ids) ? current.ids.map(String) : [];
                    const nextIds = ids.includes(createdResourceId)
                        ? ids
                        : [...ids, createdResourceId];

                    const nextResources = [...existing];
                    nextResources[existingIdx] = {
                        typeId,
                        isSelectable: Boolean(current.isSelectable),
                        blocksDuringAppointment: true,
                        ids: nextIds,
                        hideAnyAvailable: Boolean(current.hideAnyAvailable),
                    };

                    return {
                        locationId: String(loc?.locationId ?? ''),
                        resources: nextResources.map((r) => ({
                            typeId: String(r.typeId ?? ''),
                            isSelectable: Boolean(r.isSelectable),
                            blocksDuringAppointment: true,
                            ids: Array.isArray(r.ids) ? r.ids.map(String) : [],
                            hideAnyAvailable: Boolean(r.hideAnyAvailable),
                        })),
                    };
                });

                await updateServiceRequest({
                    id: serviceId,
                    payload: {
                        locationResources: nextLocationResources,
                    },
                });
            }

            message.success('Holiday setup connected (services updated)');
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
            if (!state.resourceDraft.typeId.trim()) {
                message.error('Missing resource typeId');
                return;
            }
            const resourceName = state.resourceDraft.name.trim()
                ? state.resourceDraft.name.trim()
                : `Holiday - ${state.selectedCountryCode}`;

            const holidayDates = Object.keys(holidaysByDate).sort();
            const weekdayAvailabilities = [
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
            ].map((weekday) => ({
                type: 'wday',
                weekday,
                intervals: [
                    {
                        from: '00:00',
                        to: '23:59',
                    },
                ],
            }));

            const holidayOverrides = holidayDates.map((date) => ({
                type: 'date',
                date,
                intervals: [],
            }));

            const availabilities = [...weekdayAvailabilities, ...holidayOverrides];

            const created = await createResourceRequest({
                payload: {
                    typeId: state.resourceDraft.typeId.trim(),
                    name: resourceName,
                    timezone: state.resourceDraft.timezone.trim() || undefined,
                    status: true,
                    email: undefined,
                    image: undefined,
                    availabilities,
                    availabilitiesRange: {
                        availableFrom: {
                            type: 'NOW',
                        },
                        availableTo: {
                            type: 'INDEFINITELY',
                        },
                    },
                    description: undefined,
                    eventDescription: undefined,
                    mobile: undefined,
                    notificationEmailStatus: undefined,
                },
            });
            dispatch({
                type: 'SET_CREATED_RESOURCE_ID',
                id: created?.id ? String(created.id) : null,
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
        return <HomePanel resources={resources} />;
    };

    const renderAddHolidayPanel = () => {
        return (
            <AddHolidayPanel
                selectedYear={state.selectedYear}
                holidaysByDate={holidaysByDate}
                typeId={state.resourceDraft.typeId}
                name={state.resourceDraft.name}
                timezone={state.resourceDraft.timezone}
                onTypeIdChange={(typeId) =>
                    dispatch({ type: 'SET_RESOURCE_DRAFT', draft: { typeId } })
                }
                onNameChange={(name) =>
                    dispatch({ type: 'SET_RESOURCE_DRAFT', draft: { name } })
                }
                onTimezoneChange={(timezone) =>
                    dispatch({ type: 'SET_RESOURCE_DRAFT', draft: { timezone } })
                }
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

const mapResourcesResponse = (
    response: any,
): HomeResourceRow[] => {
    if (!response || !Array.isArray(response.data)) {
        return [];
    }

    return response.data
        .map((resource: any) => ({
            id: String(resource?.id ?? ''),
            cursor: String(resource?.cursor ?? ''),
            name: String(resource?.name ?? ''),
            type: String(resource?.type ?? ''),
            timezone: String(resource?.timezone ?? ''),
            status: Boolean(resource?.status),
            email: String(resource?.email ?? ''),
            mobile: String(resource?.mobile ?? ''),
            shopId: String(resource?.shopId ?? ''),
            description: String(resource?.description ?? ''),
            eventDescription: String(resource?.eventDescription ?? ''),
        }))
        .filter(
            (resource: HomeResourceRow) =>
                resource.id.length > 0 && resource.name.length > 0,
        );
};

export default Admin;
