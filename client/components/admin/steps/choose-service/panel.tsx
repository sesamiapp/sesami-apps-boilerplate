import { Checkbox, Typography } from 'antd';
import { MonthGrid } from '../../month-grid';
import { styles } from '../../styles';

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
        <div style={styles.chooseServicePanel}>
            <div style={styles.chooseServiceLeft}>
                <Text strong style={{ marginBottom: 12 }}>
                    Holiday Calendar ({selectedYear})
                </Text>
                <MonthGrid columns={2} year={selectedYear} />
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

