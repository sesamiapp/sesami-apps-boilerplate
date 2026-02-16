import { type CSSProperties } from 'react';
import { MonthGrid } from '../../month-grid';

interface AddHolidayPanelProps {
    selectedYear: number;
}

export const AddHolidayPanel = ({ selectedYear }: AddHolidayPanelProps) => {
    return (
        <div style={localStyles.root}>
            <MonthGrid columns={4} year={selectedYear} />
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
