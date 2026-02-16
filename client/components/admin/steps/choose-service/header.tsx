import { Button, Typography } from 'antd';
import { styles } from '../../styles';

const { Title, Text } = Typography;

interface ChooseServiceHeaderProps {
    connecting: boolean;
    onGuide: () => void;
    onDoLater: () => void;
    onConnect: () => void;
}

export const ChooseServiceHeader = ({
    connecting,
    onGuide,
    onDoLater,
    onConnect,
}: ChooseServiceHeaderProps) => {
    return (
        <div style={{ ...styles.headerContent, ...localStyles.root }}>
            <div>
                <Title level={4} style={{ margin: 0 }}>
                    Choose Service
                </Title>
                <Text type="secondary">Attach holiday setup to services</Text>
            </div>

            <div style={styles.buttonRow}>
                <Button onClick={onGuide}>Guide</Button>
                <Button onClick={onDoLater}>Do it later</Button>
                <Button type="primary" loading={connecting} onClick={onConnect}>
                    Connect
                </Button>
            </div>
        </div>
    );
};

const localStyles = {
    root: {},
};
