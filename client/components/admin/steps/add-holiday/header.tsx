import { Button, Select, Typography } from 'antd';
import { type CSSProperties } from 'react';
import { styles } from '../../styles';

const { Title, Text } = Typography;

interface AddHolidayHeaderProps {
    selectedTemplate: string;
    templateOptions: Array<{ label: string; value: string }>;
    onTemplateChange: (template: string) => void;
    onGuide: () => void;
    onCancel: () => void;
    onCreate: () => void;
}

export const AddHolidayHeader = ({
    selectedTemplate,
    templateOptions,
    onTemplateChange,
    onGuide,
    onCancel,
    onCreate,
}: AddHolidayHeaderProps) => {
    return (
        <div style={styles.headerContent}>
            <div style={localStyles.leftHeaderWithControl}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>
                        Add Holiday
                    </Title>
                    <Text type="secondary">Visual yearly calendar</Text>
                </div>
                <Select
                    style={localStyles.templateSelect}
                    value={selectedTemplate}
                    options={templateOptions}
                    onChange={onTemplateChange}
                />
            </div>

            <div style={styles.buttonRow}>
                <Button onClick={onGuide}>Guide</Button>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="primary" onClick={onCreate}>
                    Create
                </Button>
            </div>
        </div>
    );
};

const localStyles: Record<string, CSSProperties> = {
    leftHeaderWithControl: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
    },
    templateSelect: {
        minWidth: 180,
    },
};
