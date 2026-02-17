import { Button, Typography } from 'antd';
import { styles } from '../../styles';

const { Title, Text } = Typography;

interface HomeHeaderProps {
    onGuide: () => void;
    onApplyHoliday: () => void;
}

export const HomeHeader = ({ onGuide, onApplyHoliday }: HomeHeaderProps) => {
    return (
        <div style={{ ...styles.headerContent, ...localStyles.root }}>
            <div>
                <Title level={4} style={{ margin: 0 }}>
                    Holiday Dashboard
                </Title>
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

const localStyles = {
    root: {},
};
