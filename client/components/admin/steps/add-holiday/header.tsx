import { Button, Select, Typography } from 'antd';
import { type CSSProperties } from 'react';
import { styles } from '../../styles';

const { Title } = Typography;

interface AddHolidayHeaderProps {
    selectedCountryCode: string;
    countryOptions: Array<{ label: string; value: string }>;
    onCountryChange: (countryCode: string) => void;
    creatingResource: boolean;
    createLabel?: string;
    onGuide: () => void;
    onCancel: () => void;
    onCreate: () => void;
}

export const AddHolidayHeader = ({
    selectedCountryCode,
    countryOptions,
    onCountryChange,
    creatingResource,
    createLabel,
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
                </div>
                <Select
                    style={localStyles.templateSelect}
                    value={selectedCountryCode}
                    options={countryOptions}
                    onChange={onCountryChange}
                    showSearch
                    optionFilterProp="label"
                />
            </div>

            <div style={styles.buttonRow}>
                <Button onClick={onGuide}>Guide</Button>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="primary" loading={creatingResource} onClick={onCreate}>
                    {createLabel ?? 'Create'}
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
