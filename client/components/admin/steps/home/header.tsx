import { Button, Typography } from 'antd';
import { styles } from '../../styles';

const { Title, Text } = Typography;

interface HomeHeaderProps {
    onGuide: () => void;
    onApplyHoliday: () => void;
}

export const HomeHeader = ({ onGuide, onApplyHoliday }: HomeHeaderProps) => {
    return (
        <div style={styles.headerContent}>
            <div>
                <Title level={4} style={{ margin: 0 }}>
                    Holiday Dashboard
                </Title>
                <Text type="secondary">Manage yearly vacation setup</Text>
            </div>

            <div style={styles.buttonRow}>
                <Button onClick={onGuide}>Guide</Button>
                <Button type="primary" onClick={onApplyHoliday}>
                    Apply Holiday
                </Button>
            </div>
        </div>
    );
};

