import { useEffect, useMemo, useReducer, useState } from 'react';
import { Modal, Typography, message } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdProvider, useSesami_AdminAppLoader } from '../hooks';
import {
    createResourceRequest,
    deleteResourceRequest,
    retrieveResourceByIdRequest,
    retrieveResourcesRequest,
    retrieveServiceByIdRequest,
    retrieveServicesRequest,
    updateResourceRequest,
    updateServiceRequest,
} from '../sesami-api/sesami.api';
import {
    DEFAULT_COUNTRY_CODE,
    GUIDE_TEXT,
} from './admin/constants';
import {
    getCountryOptions,
    getCountryShortName,
    getHolidaysByDate,
    getSuggestedTimezones,
} from './admin/holiday-data';
import { AddHolidayHeader } from './admin/steps/add-holiday/header';
import { AddHolidayPanel } from './admin/steps/add-holiday/panel';
import { ChooseServiceHeader } from './admin/steps/choose-service/header';
import { ChooseServicePanel } from './admin/steps/choose-service/panel';
import { HomeHeader } from './admin/steps/home/header';
import { HomePanel } from './admin/steps/home/panel';
import { createInitialState, reducer } from './admin/state';
import { styles } from './admin/styles';
import * as mock from '../../data/mock';

const { Text } = Typography;

const queryClient = new QueryClient();

interface HomeResourceRow {
    id: string;
    cursor: string;
    name: string;
    typeId: string;
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
    const shopId = useMemo(
        () =>
            new URLSearchParams(window.location.search).get('shopId') ??
            mock.shop.shopId,
        [],
    );

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
    const [isLoadingResources, setIsLoadingResources] = useState(false);
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    const [isCreatingResource, setIsCreatingResource] = useState(false);
    const holidaysByDate = useMemo(
        () => getHolidaysByDate(state.selectedCountryCode, state.selectedYear),
        [state.selectedCountryCode, state.selectedYear],
    );

    const timezoneOptions = useMemo(() => {
        const suggested = getSuggestedTimezones(state.selectedCountryCode);
        const current =
            typeof Intl !== 'undefined'
                ? Intl.DateTimeFormat().resolvedOptions().timeZone
                : 'UTC';
        const values = Array.from(new Set([...(suggested ?? []), state.resourceDraft.timezone, current]))
            .filter(Boolean)
            .slice(0, 8);
        return values.map((tz) => ({ label: tz, value: tz }));
    }, [state.selectedCountryCode, state.resourceDraft.timezone]);

    useEffect(() => {
        if (state.resourceDraft.nameTouched) {
            return;
        }
        const nextName = `${getCountryShortName(state.selectedCountryCode)} official holiday`;
        if (state.resourceDraft.name !== nextName) {
            dispatch({ type: 'SET_RESOURCE_DRAFT', draft: { name: nextName } });
        }
    }, [state.selectedCountryCode, state.resourceDraft.name, state.resourceDraft.nameTouched]);

    useEffect(() => {
        if (state.step !== 'home') {
            return;
        }
        let isActive = true;

        const fetchResources = async () => {
            setIsLoadingResources(true);
            try {
                const response = await retrieveResourcesRequest({
                    shopId,
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
            } finally {
                if (isActive) {
                    setIsLoadingResources(false);
                }
            }
        };

        void fetchResources();
        return () => {
            isActive = false;
        };
    }, [state.step, shopId]);

    useEffect(() => {
        if (state.step !== 'chooseService') {
            return;
        }

        let isActive = true;
        const fetchServices = async () => {
            setIsLoadingServices(true);
            try {
                const response = await retrieveServicesRequest({
                    shopId,
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
    }, [state.step, shopId]);

    if (!Sesami) {
        return 'loading...';
    }

    const openGuide = () => dispatch({ type: 'SET_GUIDE_OPEN', open: true });

    const closeGuide = () => dispatch({ type: 'SET_GUIDE_OPEN', open: false });

    const handleConnect = async () => {
        dispatch({ type: 'SET_CONNECTING', connecting: true });

        try {
            const targetResourceId =
                state.mode === 'create' ? state.createdResourceId : state.activeResourceId;
            if (!targetResourceId) {
                message.error('No resource selected to connect.');
                return;
            }
            if (state.selectedServiceIds.length === 0) {
                message.error('No services selected.');
                return;
            }

            const selectedSet = new Set(state.selectedServiceIds.map(String));
            const initialSet = new Set(state.initialSelectedServiceIds.map(String));

            const servicesToAdd = Array.from(selectedSet).filter((id) => !initialSet.has(id));
            const servicesToRemove = Array.from(initialSet).filter((id) => !selectedSet.has(id));

            const typeId = state.resourceDraft.typeId.trim();
            if (!typeId) {
                message.error('Missing resource typeId');
                return;
            }

            for (const serviceId of servicesToAdd) {
                const service = await retrieveServiceByIdRequest({ shopId, id: serviceId });
                const locations: any[] = Array.isArray(service?.locations) ? service.locations : [];

                if (locations.length === 0) {
                    throw new Error(`Service ${serviceId} has no locations to attach resources to`);
                }

                const nextLocationResources = locations.map((loc) => {
                    const existing: any[] = Array.isArray(loc?.resources) ? loc.resources : [];
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
                                    ids: [targetResourceId],
                                    hideAnyAvailable: false,
                                },
                            ],
                        };
                    }

                    const current = existing[existingIdx]!;
                    const ids = Array.isArray(current.ids) ? current.ids.map(String) : [];
                    const nextIds = ids.includes(targetResourceId)
                        ? ids
                        : [...ids, targetResourceId];

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
                    shopId,
                    id: serviceId,
                    payload: {
                        locationResources: nextLocationResources,
                    },
                });
            }

            for (const serviceId of servicesToRemove) {
                const service = await retrieveServiceByIdRequest({ shopId, id: serviceId });
                const locations: any[] = Array.isArray(service?.locations) ? service.locations : [];
                if (locations.length === 0) {
                    continue;
                }

                const nextLocationResources = locations.map((loc) => {
                    const existing: any[] = Array.isArray(loc?.resources) ? loc.resources : [];
                    const nextResources = existing
                        .map((r) => {
                            if (String(r?.typeId ?? '') !== typeId) {
                                return r;
                            }
                            const ids: string[] = Array.isArray(r?.ids)
                                ? (r.ids as any[]).map((value) => String(value))
                                : [];
                            const nextIds = ids.filter((id: string) => id !== targetResourceId);
                            return { ...r, ids: nextIds };
                        })
                        .filter((r) => {
                            if (String(r?.typeId ?? '') !== typeId) return true;
                            const ids = Array.isArray(r?.ids) ? r.ids : [];
                            return ids.length > 0;
                        })
                        .map((r) => ({
                            typeId: String(r.typeId ?? ''),
                            isSelectable: Boolean(r.isSelectable),
                            blocksDuringAppointment: true,
                            ids: Array.isArray(r.ids) ? r.ids.map(String) : [],
                            hideAnyAvailable: Boolean(r.hideAnyAvailable),
                        }));

                    return {
                        locationId: String(loc?.locationId ?? ''),
                        resources: nextResources,
                    };
                });

                await updateServiceRequest({
                    shopId,
                    id: serviceId,
                    payload: { locationResources: nextLocationResources },
                });
            }

            message.success(state.mode === 'apply' ? 'Services updated' : 'Services connected');
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Connect request failed';
            message.error(errorMessage);
        } finally {
            dispatch({ type: 'SET_CONNECTING', connecting: false });
            dispatch({ type: 'SET_STEP', step: 'home' });
            dispatch({ type: 'SET_MODE', mode: 'create' });
            dispatch({ type: 'SET_ACTIVE_RESOURCE_ID', id: null });
            dispatch({ type: 'SET_SERVICES', serviceIds: [] });
            dispatch({ type: 'SET_INITIAL_SERVICES', serviceIds: [] });
        }
    };

    const handleCreateResource = async () => {
        setIsCreatingResource(true);
        try {
            const isEdit = state.mode === 'edit';
            const editId = state.activeResourceId;
            if (!state.resourceDraft.typeId.trim()) {
                message.error('Missing resource typeId');
                return;
            }
            const resourceName = state.resourceDraft.name.trim()
                ? state.resourceDraft.name.trim()
                : `${getCountryShortName(state.selectedCountryCode)} official holiday`;

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

            if (isEdit) {
                if (!editId) {
                    message.error('No resource selected to update.');
                    return;
                }
                await updateResourceRequest({
                    shopId,
                    id: editId,
                    payload: {
                        typeId: state.resourceDraft.typeId.trim(),
                        name: resourceName,
                        timezone: state.resourceDraft.timezone.trim() || undefined,
                        availabilities,
                        availabilitiesRange: {
                            availableFrom: { type: 'NOW' },
                            availableTo: { type: 'INDEFINITELY' },
                        },
                    },
                });
                message.success('Resource updated');
            } else {
                const created = await createResourceRequest({
                    shopId,
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
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Create resource request failed';
            message.error(errorMessage);
        } finally {
            setIsCreatingResource(false);
            if (state.mode === 'edit') {
                dispatch({ type: 'SET_STEP', step: 'home' });
                dispatch({ type: 'SET_MODE', mode: 'create' });
                dispatch({ type: 'SET_ACTIVE_RESOURCE_ID', id: null });
            } else {
                dispatch({ type: 'SET_STEP', step: 'chooseService' });
            }
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
                    onCountryChange={(countryCode) => {
                        dispatch({ type: 'SET_COUNTRY', countryCode });
                        dispatch({
                            type: 'SET_RESOURCE_DRAFT',
                            draft: {
                                name: `${getCountryShortName(countryCode)} official holiday`,
                                nameTouched: false,
                                timezone:
                                    getSuggestedTimezones(countryCode)[0] ??
                                    (typeof Intl !== 'undefined'
                                        ? Intl.DateTimeFormat().resolvedOptions().timeZone
                                        : 'UTC'),
                            },
                        });
                        dispatch({ type: 'SET_CREATED_RESOURCE_ID', id: null });
                    }}
                    creatingResource={isCreatingResource}
                    createLabel={state.mode === 'edit' ? 'Update' : 'Create'}
                    onGuide={openGuide}
                    onCancel={() => dispatch({ type: 'SET_STEP', step: 'home' })}
                    onCreate={handleCreateResource}
                />
            );
        }

        return (
            <ChooseServiceHeader
                connecting={state.connecting}
                connectLabel={state.mode === 'apply' ? 'Update' : 'Connect'}
                onGuide={openGuide}
                onDoLater={() => dispatch({ type: 'SET_STEP', step: 'home' })}
                onConnect={handleConnect}
            />
        );
    };

    const renderHomePanel = () => {
        const resolveConnectedServiceIds = async (resourceId: string, typeId: string) => {
            const serviceList = await retrieveServicesRequest({ shopId, limit: 50 });
            const ids = Array.isArray(serviceList?.data)
                ? serviceList.data.map((s: any) => String(s?.id ?? '')).filter((id: string) => id.length > 0)
                : [];
            if (ids.length === 0) return [];

            const details = await Promise.all(
                ids.map(async (serviceId: string) => {
                    try {
                        const svc = await retrieveServiceByIdRequest({ shopId, id: serviceId });
                        return { serviceId, svc };
                    } catch {
                        return { serviceId, svc: null };
                    }
                }),
            );

            return details
                .filter(({ svc }) => svc && Array.isArray((svc as any).locations))
                .filter(({ svc }) => {
                    const locations: any[] = Array.isArray((svc as any).locations)
                        ? (svc as any).locations
                        : [];
                    return locations.some((loc) => {
                        const res: any[] = Array.isArray(loc?.resources) ? loc.resources : [];
                        const match = res.find((r) => String(r?.typeId ?? '') === typeId);
                        const ids = Array.isArray(match?.ids) ? match.ids.map(String) : [];
                        return ids.includes(resourceId);
                    });
                })
                .map(({ serviceId }) => serviceId);
        };

        const onApplyToService = async (resource: {
            id: string;
            typeId: string;
            name: string;
            timezone: string;
        }) => {
            try {
                dispatch({ type: 'SET_MODE', mode: 'apply' });
                dispatch({ type: 'SET_ACTIVE_RESOURCE_ID', id: resource.id });
                dispatch({ type: 'SET_RESOURCE_DRAFT', draft: { typeId: resource.typeId } });
                const connected = await resolveConnectedServiceIds(resource.id, resource.typeId);
                dispatch({ type: 'SET_SERVICES', serviceIds: connected });
                dispatch({ type: 'SET_INITIAL_SERVICES', serviceIds: connected });
                dispatch({ type: 'SET_STEP', step: 'chooseService' });
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : 'Failed to load connected services';
                message.error(errorMessage);
            }
        };

        const onEdit = async (resource: {
            id: string;
            typeId: string;
            name: string;
            timezone: string;
        }) => {
            dispatch({ type: 'SET_MODE', mode: 'edit' });
            dispatch({ type: 'SET_ACTIVE_RESOURCE_ID', id: resource.id });
            dispatch({
                type: 'SET_RESOURCE_DRAFT',
                draft: {
                    typeId: resource.typeId,
                    name: resource.name,
                    timezone: resource.timezone,
                    nameTouched: true,
                },
            });

            try {
                const full = await retrieveResourceByIdRequest({
                    shopId,
                    id: resource.id,
                });
                const nextName = String(full?.name ?? resource.name ?? '');
                const nextTimezone = String(full?.timezone ?? resource.timezone ?? '');
                const nextTypeId = String(full?.typeId ?? resource.typeId ?? '');
                dispatch({
                    type: 'SET_RESOURCE_DRAFT',
                    draft: {
                        typeId: nextTypeId,
                        name: nextName,
                        timezone: nextTimezone,
                        nameTouched: true,
                    },
                });
            } catch {
                // best-effort; we can edit based on row data
            } finally {
                dispatch({ type: 'SET_STEP', step: 'addHoliday' });
            }
        };

        const onRemove = async (resource: { id: string; typeId: string; name: string }) => {
            Modal.confirm({
                title: 'Remove resource?',
                content: `This will delete "${resource.name}" and detach it from connected services.`,
                okText: 'Remove',
                okButtonProps: { danger: true },
                cancelText: 'Cancel',
                onOk: async () => {
                    try {
                        const connected = await resolveConnectedServiceIds(resource.id, resource.typeId);
                        for (const serviceId of connected) {
                            const service = await retrieveServiceByIdRequest({ shopId, id: serviceId });
                            const locations: any[] = Array.isArray(service?.locations)
                                ? service.locations
                                : [];
                            if (locations.length === 0) continue;

                            const nextLocationResources = locations.map((loc) => {
                                const existing: any[] = Array.isArray(loc?.resources) ? loc.resources : [];
                                const nextResources = existing
                                    .map((r) => {
                                        if (String(r?.typeId ?? '') !== resource.typeId) return r;
                                        const ids: string[] = Array.isArray(r?.ids)
                                            ? (r.ids as any[]).map((value) => String(value))
                                            : [];
                                        const nextIds = ids.filter((id: string) => id !== resource.id);
                                        return { ...r, ids: nextIds };
                                    })
                                    .filter((r) => {
                                        if (String(r?.typeId ?? '') !== resource.typeId) return true;
                                        const ids = Array.isArray(r?.ids) ? r.ids : [];
                                        return ids.length > 0;
                                    })
                                    .map((r) => ({
                                        typeId: String(r.typeId ?? ''),
                                        isSelectable: Boolean(r.isSelectable),
                                        blocksDuringAppointment: true,
                                        ids: Array.isArray(r.ids) ? r.ids.map(String) : [],
                                        hideAnyAvailable: Boolean(r.hideAnyAvailable),
                                    }));

                                return {
                                    locationId: String(loc?.locationId ?? ''),
                                    resources: nextResources,
                                };
                            });

                            await updateServiceRequest({
                                shopId,
                                id: serviceId,
                                payload: { locationResources: nextLocationResources },
                            });
                        }

                        await deleteResourceRequest({ shopId, id: resource.id });
                        message.success('Resource removed');

                        const response = await retrieveResourcesRequest({
                            shopId,
                            limit: 50,
                        });
                        setResources(mapResourcesResponse(response));
                    } catch (error) {
                        const errorMessage =
                            error instanceof Error ? error.message : 'Remove resource failed';
                        message.error(errorMessage);
                    }
                },
            });
        };

        return (
            <HomePanel
                resources={resources}
                loading={isLoadingResources}
                onApplyToService={onApplyToService}
                onEdit={onEdit}
                onRemove={onRemove}
            />
        );
    };

    const renderAddHolidayPanel = () => {
        return (
            <AddHolidayPanel
                selectedYear={state.selectedYear}
                holidaysByDate={holidaysByDate}
                typeId={state.resourceDraft.typeId}
                name={state.resourceDraft.name}
                timezone={state.resourceDraft.timezone}
                timezoneOptions={timezoneOptions}
                onTypeIdChange={(typeId) =>
                    dispatch({ type: 'SET_RESOURCE_DRAFT', draft: { typeId } })
                }
                onNameChange={(name) =>
                    dispatch({
                        type: 'SET_RESOURCE_DRAFT',
                        draft: { name, nameTouched: true },
                    })
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
            typeId: String(resource?.typeId ?? resource?.type ?? ''),
            type: String(resource?.type ?? resource?.typeId ?? ''),
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
