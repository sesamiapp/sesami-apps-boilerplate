import { Typography } from 'antd';
import { type CSSProperties } from 'react';
import { MonthGrid } from '../../month-grid';

const { Text } = Typography;

interface AddHolidayPanelProps {
    selectedYear: number;
}

export const AddHolidayPanel = ({ selectedYear }: AddHolidayPanelProps) => {
    return (
        <div style={localStyles.root}>
            <Text strong style={localStyles.yearLabel}>
                Year: {selectedYear}
            </Text>
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
