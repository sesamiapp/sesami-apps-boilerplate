import { type CSSProperties, useReducer } from 'react';
import {
    Button,
    Calendar,
    Checkbox,
    Empty,
    Modal,
    Select,
    Typography,
    message,
} from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { AntdProvider, useSesami_AdminAppLoader } from '../hooks';
import { apiRequest } from '../api';

const { Title, Text } = Typography;

const queryClient = new QueryClient();

// Dashboard steps: home -> addHoliday -> chooseService.
type Step = 'home' | 'addHoliday' | 'chooseService';

interface AdminState {
    step: Step;
    guideOpen: boolean;
    selectedYear: number;
    selectedTemplate: string;
    selectedServiceIds: string[];
    connecting: boolean;
}

type AdminAction =
    | { type: 'SET_STEP'; step: Step }
    | { type: 'SET_GUIDE_OPEN'; open: boolean }
    | { type: 'SET_TEMPLATE'; template: string }
    | { type: 'SET_SERVICES'; serviceIds: string[] }
    | { type: 'SET_CONNECTING'; connecting: boolean };

const MOCK_HOME_HOLIDAYS: Array<{ id: string; title: string }> = [];

const MOCK_TEMPLATE_OPTIONS = [
    { label: 'Public Holidays', value: 'public-holidays' },
    { label: 'Team Holidays', value: 'team-holidays' },
    { label: 'Custom Holidays', value: 'custom-holidays' },
];

const MOCK_SERVICES = [
    { id: 'service-1', label: 'Service A' },
    { id: 'service-2', label: 'Service B' },
    { id: 'service-3', label: 'Service C' },
    { id: 'service-4', label: 'Service D' },
    { id: 'service-5', label: 'Service E' },
];

const GUIDE_TEXT =
    'This is a temporary guide message. We will replace it with final content later.';

const reducer = (state: AdminState, action: AdminAction): AdminState => {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, step: action.step };
        case 'SET_GUIDE_OPEN':
            return { ...state, guideOpen: action.open };
        case 'SET_TEMPLATE':
            return { ...state, selectedTemplate: action.template };
        case 'SET_SERVICES':
            return { ...state, selectedServiceIds: action.serviceIds };
        case 'SET_CONNECTING':
            return { ...state, connecting: action.connecting };
        default:
            return state;
    }
};

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
    const [state, dispatch] = useReducer(reducer, {
        step: 'home',
        guideOpen: false,
        selectedYear: currentYear,
        selectedTemplate: MOCK_TEMPLATE_OPTIONS[0].value,
        selectedServiceIds: [],
        connecting: false,
    });

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
                <div style={styles.headerContent}>
                    <div>
                        <Title level={4} style={{ margin: 0 }}>
                            Holiday Dashboard
                        </Title>
                        <Text type="secondary">Manage yearly vacation setup</Text>
                    </div>

                    <div style={styles.buttonRow}>
                        <Button onClick={openGuide}>Guide</Button>
                        <Button
                            type="primary"
                            onClick={() =>
                                dispatch({ type: 'SET_STEP', step: 'addHoliday' })
                            }
                        >
                            Apply Holiday
                        </Button>
                    </div>
                </div>
            );
        }

        if (state.step === 'addHoliday') {
            return (
                <div style={styles.headerContent}>
                    <div style={styles.leftHeaderWithControl}>
                        <div>
                            <Title level={4} style={{ margin: 0 }}>
                                Add Holiday
                            </Title>
                            <Text type="secondary">Visual yearly calendar</Text>
                        </div>
                        <Select
                            style={{ minWidth: 180 }}
                            value={state.selectedTemplate}
                            options={MOCK_TEMPLATE_OPTIONS}
                            onChange={(template) =>
                                dispatch({ type: 'SET_TEMPLATE', template })
                            }
                        />
                    </div>

                    <div style={styles.buttonRow}>
                        <Button onClick={openGuide}>Guide</Button>
                        <Button onClick={() => dispatch({ type: 'SET_STEP', step: 'home' })}>
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={() =>
                                dispatch({ type: 'SET_STEP', step: 'chooseService' })
                            }
                        >
                            Create
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div style={styles.headerContent}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>
                        Choose Service
                    </Title>
                    <Text type="secondary">Attach holiday setup to services</Text>
                </div>

                <div style={styles.buttonRow}>
                    <Button onClick={openGuide}>Guide</Button>
                    <Button onClick={() => dispatch({ type: 'SET_STEP', step: 'home' })}>
                        Do it later
                    </Button>
                    <Button
                        type="primary"
                        loading={state.connecting}
                        onClick={handleConnect}
                    >
                        Connect
                    </Button>
                </div>
            </div>
        );
    };

    const renderHomePanel = () => {
        if (MOCK_HOME_HOLIDAYS.length === 0) {
            return <Empty description="No holiday records yet" />;
        }

        return (
            <div>
                {MOCK_HOME_HOLIDAYS.map((holiday) => (
                    <div key={holiday.id}>{holiday.title}</div>
                ))}
            </div>
        );
    };

    const renderAddHolidayPanel = () => (
        <div>
            <Text strong style={{ display: 'block', marginBottom: 16 }}>
                Year: {state.selectedYear}
            </Text>
            <MonthGrid columns={4} year={state.selectedYear} />
        </div>
    );

    const renderChooseServicePanel = () => (
        <div style={styles.chooseServicePanel}>
            <div style={styles.chooseServiceLeft}>
                <Text strong style={{ marginBottom: 12 }}>
                    Holiday Calendar ({state.selectedYear})
                </Text>
                <MonthGrid columns={2} year={state.selectedYear} />
            </div>

            <div style={styles.chooseServiceRight}>
                <Text strong style={{ marginBottom: 8 }}>
                    Services
                </Text>
                <Text type="secondary" style={{ marginBottom: 16 }}>
                    Mock list for now
                </Text>

                <Checkbox.Group
                    style={styles.serviceGroup}
                    value={state.selectedServiceIds}
                    options={MOCK_SERVICES.map((service) => ({
                        label: service.label,
                        value: service.id,
                    }))}
                    onChange={(values) =>
                        dispatch({
                            type: 'SET_SERVICES',
                            serviceIds: values.map(String),
                        })
                    }
                />
            </div>
        </div>
    );

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
        <div style={styles.page}>
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

const MonthGrid = ({ columns, year }: { columns: number; year: number }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, minmax(260px, 1fr))`,
                gap: 12,
            }}
        >
            {Array.from({ length: 12 }, (_, monthIndex) => (
                <MonthCalendarCard
                    key={monthIndex}
                    year={year}
                    monthIndex={monthIndex}
                />
            ))}
        </div>
    );
};

const MonthCalendarCard = ({
    year,
    monthIndex,
}: {
    year: number;
    monthIndex: number;
}) => {
    const monthStart = dayjs().year(year).month(monthIndex).date(1);
    const monthEnd = monthStart.endOf('month');

    return (
        <div style={styles.calendarCard}>
            <Text strong style={{ marginBottom: 8 }}>
                {monthStart.format('MMM').toUpperCase()}
            </Text>
            <div style={{ pointerEvents: 'none' }}>
                <Calendar
                    fullscreen={false}
                    value={monthStart}
                    validRange={[monthStart, monthEnd]}
                    headerRender={() => <></>}
                />
            </div>
        </div>
    );
};

const styles: Record<string, CSSProperties> = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        minHeight: '100vh',
        boxSizing: 'border-box',
    },
    headerSection: {
        border: '1px solid #d9d9d9',
        borderRadius: 12,
        background: '#ffffff',
        padding: 20,
    },
    panelSection: {
        border: '1px solid #d9d9d9',
        borderRadius: 12,
        background: '#ffffff',
        padding: 20,
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
    },
    leftHeaderWithControl: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
    },
    buttonRow: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
    },
    chooseServicePanel: {
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    chooseServiceLeft: {
        flex: '1 1 680px',
        display: 'flex',
        flexDirection: 'column',
    },
    chooseServiceRight: {
        flex: '0 0 280px',
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        padding: 14,
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
    },
    serviceGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    calendarCard: {
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        padding: 10,
        background: '#ffffff',
    },
};

export default Admin;
