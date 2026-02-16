import { Typography } from 'antd';
import { MonthGrid } from '../../month-grid';

const { Text } = Typography;

interface AddHolidayPanelProps {
    selectedYear: number;
}

export const AddHolidayPanel = ({ selectedYear }: AddHolidayPanelProps) => {
    return (
        <div>
            <Text strong style={{ display: 'block', marginBottom: 16 }}>
                Year: {selectedYear}
            </Text>
            <MonthGrid columns={4} year={selectedYear} />
        </div>
    );
};

