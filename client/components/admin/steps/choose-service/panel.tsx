import { Checkbox, Input, List, Typography } from 'antd';
import { useMemo, useState, type CSSProperties } from 'react';
import { MonthGrid } from '../../month-grid';

const { Text } = Typography;

interface ChooseServicePanelProps {
    selectedYear: number;
    holidaysByDate: Record<string, string[]>;
    selectedServiceIds: string[];
    services: Array<{ id: string; label: string }>;
    isLoadingServices: boolean;
    onServicesChange: (serviceIds: string[]) => void;
}

export const ChooseServicePanel = ({
    selectedYear,
    holidaysByDate,
    selectedServiceIds,
    services,
    isLoadingServices,
    onServicesChange,
}: ChooseServicePanelProps) => {
    const [query, setQuery] = useState('');

    const filteredServices = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return services;
        return services.filter((s) => s.label.toLowerCase().includes(q) || s.id.includes(q));
    }, [query, services]);

    const selectedSet = useMemo(
        () => new Set(selectedServiceIds.map(String)),
        [selectedServiceIds],
    );

    return (
        <div style={localStyles.chooseServicePanel}>
            <div style={localStyles.chooseServiceLeft}>
                <MonthGrid
                    columns={2}
                    year={selectedYear}
                    holidaysByDate={holidaysByDate}
                    useViewportHeight={false}
                />
            </div>

            <div style={localStyles.chooseServiceRight}>
                <div style={localStyles.servicesHeader}>
                    <div>
                        <Text strong style={localStyles.servicesTitle}>
                            Services
                        </Text>
                        <div>
                            <Text type="secondary" style={localStyles.servicesSubtitle}>
                                {isLoadingServices
                                    ? 'Loading services...'
                                    : `${selectedServiceIds.length} selected`}
                            </Text>
                        </div>
                    </div>
                    <Input.Search
                        placeholder="Search services"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        allowClear
                        style={localStyles.search}
                    />
                </div>

                <div style={localStyles.listWrapper}>
                    <List
                        size="small"
                        loading={isLoadingServices}
                        dataSource={filteredServices}
                        renderItem={(service) => {
                            const checked = selectedSet.has(service.id);
                            return (
                                <List.Item style={localStyles.listItem}>
                                    <Checkbox
                                        checked={checked}
                                        onChange={() => {
                                            const next = checked
                                                ? selectedServiceIds.filter((id) => id !== service.id)
                                                : [...selectedServiceIds, service.id];
                                            onServicesChange(next);
                                        }}
                                    >
                                        <div style={localStyles.serviceRow}>
                                            <div style={localStyles.serviceLabel}>
                                                {service.label}
                                            </div>
                                            <div style={localStyles.serviceId}>
                                                {service.id}
                                            </div>
                                        </div>
                                    </Checkbox>
                                </List.Item>
                            );
                        }}
                    />
                </div>
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
        padding: 12,
    },
    servicesHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 12,
    },
    servicesTitle: {
        display: 'block',
    },
    servicesSubtitle: {
        display: 'block',
    },
    search: {
        maxWidth: 260,
    },
    listWrapper: {
        overflow: 'auto',
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        background: '#ffffff',
        padding: 8,
        flex: 1,
        minHeight: 0,
    },
    listItem: {
        padding: '8px 4px',
    },
    serviceRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    serviceLabel: {
        fontWeight: 600,
    },
    serviceId: {
        fontSize: 12,
        opacity: 0.6,
    },
};
