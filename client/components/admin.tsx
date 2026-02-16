import { useReducer } from 'react';
import { Modal, Typography, message } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdProvider, useSesami_AdminAppLoader } from '../hooks';
import { apiRequest } from '../api';
import {
    GUIDE_TEXT,
    MOCK_HOME_HOLIDAYS,
    MOCK_SERVICES,
    MOCK_TEMPLATE_OPTIONS,
} from './admin/constants';
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
    const [state, dispatch] = useReducer(
        reducer,
        createInitialState(currentYear, MOCK_TEMPLATE_OPTIONS[0].value),
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
                    holidayTemplate: state.selectedTemplate,
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
                    selectedTemplate={state.selectedTemplate}
                    templateOptions={MOCK_TEMPLATE_OPTIONS}
                    onTemplateChange={(template) =>
                        dispatch({ type: 'SET_TEMPLATE', template })
                    }
                    onGuide={openGuide}
                    onCancel={() => dispatch({ type: 'SET_STEP', step: 'home' })}
                    onCreate={() =>
                        dispatch({ type: 'SET_STEP', step: 'chooseService' })
                    }
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
        return <AddHolidayPanel selectedYear={state.selectedYear} />;
    };

    const renderChooseServicePanel = () => {
        return (
            <ChooseServicePanel
                selectedYear={state.selectedYear}
                selectedServiceIds={state.selectedServiceIds}
                services={MOCK_SERVICES}
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

export default Admin;
