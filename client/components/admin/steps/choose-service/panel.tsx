import { Checkbox, Typography } from 'antd';
import { type CSSProperties } from 'react';
import { MonthGrid } from '../../month-grid';

const { Text } = Typography;

interface ChooseServicePanelProps {
    selectedYear: number;
    selectedServiceIds: string[];
    services: Array<{ id: string; label: string }>;
    onServicesChange: (serviceIds: string[]) => void;
}

export const ChooseServicePanel = ({
    selectedYear,
    selectedServiceIds,
    services,
    onServicesChange,
}: ChooseServicePanelProps) => {
    return (
        <div style={localStyles.chooseServicePanel}>
            <div style={localStyles.chooseServiceLeft}>
                <MonthGrid
                    columns={2}
                    year={selectedYear}
                    useViewportHeight={false}
                />
            </div>

            <div style={localStyles.chooseServiceRight}>
                <Text strong style={localStyles.servicesTitle}>
                    Services
                </Text>
                <Text type="secondary" style={localStyles.servicesSubtitle}>
                    Mock list for now
                </Text>

                <Checkbox.Group
                    style={localStyles.serviceGroup}
                    value={selectedServiceIds}
                    options={services.map((service) => ({
                        label: service.label,
                        value: service.id,
                    }))}
                    onChange={(values) => onServicesChange(values.map(String))}
                />
            </div>
        </div>
    );
};

const localStyles: Record<string, CSSProperties> = {
    chooseServicePanel: {
        display: 'flex',
        height: '95%',
        width: '100%',
    },
    chooseServiceLeft: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
    },
    chooseServiceRight: {
        width: '50%',
        height: '100%',
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
    },
    calendarTitle: {
        marginBottom: 12,
    },
    servicesTitle: {
        marginBottom: 8,
    },
    servicesSubtitle: {
        marginBottom: 16,
    },
    serviceGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
};
