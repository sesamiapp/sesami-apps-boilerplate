import { Input } from 'antd';
import { type CSSProperties } from 'react';
import { MonthGrid } from '../../month-grid';

interface AddHolidayPanelProps {
    selectedYear: number;
    holidaysByDate: Record<string, string[]>;
    typeId: string;
    name: string;
    timezone: string;
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
    onTypeIdChange,
    onNameChange,
    onTimezoneChange,
}: AddHolidayPanelProps) => {
    return (
        <div style={localStyles.root}>
            <div style={localStyles.formRow}>
                <Input
                    placeholder="Sesami resource typeId"
                    value={typeId}
                    onChange={(e) => onTypeIdChange(e.target.value)}
                />
                <Input
                    placeholder="Resource name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
                <Input
                    placeholder="Timezone (e.g. Europe/Paris)"
                    value={timezone}
                    onChange={(e) => onTimezoneChange(e.target.value)}
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
