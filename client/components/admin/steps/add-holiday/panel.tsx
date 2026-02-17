import { type CSSProperties } from 'react';
import { MonthGrid } from '../../month-grid';

interface AddHolidayPanelProps {
    selectedYear: number;
    holidaysByDate: Record<string, string[]>;
}

export const AddHolidayPanel = ({
    selectedYear,
    holidaysByDate,
}: AddHolidayPanelProps) => {
    return (
        <div style={localStyles.root}>
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
    },
    yearLabel: {
        display: 'block',
        marginBottom: 16,
    },
};
