import { Input, Select } from 'antd';
import { type CSSProperties } from 'react';
import { MonthGrid } from '../../month-grid';

interface AddHolidayPanelProps {
    selectedYear: number;
    holidaysByDate: Record<string, string[]>;
    typeId: string;
    name: string;
    timezone: string;
    timezoneOptions: Array<{ label: string; value: string }>;
    onTypeIdChange: (value: string) => void;
    onNameChange: (value: string) => void;
    onTimezoneChange: (value: string) => void;
}

export const AddHolidayPanel = ({
    selectedYear,
    holidaysByDate,
    typeId,
    name,
    timezone,
    timezoneOptions,
    onTypeIdChange,
    onNameChange,
    onTimezoneChange,
}: AddHolidayPanelProps) => {
    return (
        <div style={localStyles.root}>
            <div style={localStyles.formRow}>
                <Select
                    placeholder="Resource type"
                    value={typeId}
                    options={[
                        { label: 'team', value: '699df672c3387f3b24c31806' },
                    ]}
                    onChange={onTypeIdChange}
                />
                <Input
                    placeholder="Resource name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
                <Select
                    showSearch
                    placeholder="Timezone"
                    value={timezone}
                    options={timezoneOptions}
                    optionFilterProp="label"
                    onChange={onTimezoneChange}
                />
            </div>
            <MonthGrid
                columns={4}
                year={selectedYear}
                holidaysByDate={holidaysByDate}
            />
        </div>
    );
};

const localStyles: Record<string, CSSProperties> = {
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 12,
        alignItems: 'center',
    },
    yearLabel: {
        display: 'block',
        marginBottom: 16,
    },
};
