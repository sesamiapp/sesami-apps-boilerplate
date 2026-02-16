import { Calendar, Typography } from 'antd';
import dayjs from 'dayjs';
import { styles } from './styles';

const { Text } = Typography;

export const MonthGrid = ({ columns, year }: { columns: number; year: number }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, minmax(260px, 1fr))`,
                gap: 12,
            }}
        >
            {Array.from({ length: 12 }, (_, monthIndex) => (
                <MonthCalendarCard
                    key={monthIndex}
                    year={year}
                    monthIndex={monthIndex}
                />
            ))}
        </div>
    );
};

const MonthCalendarCard = ({
    year,
    monthIndex,
}: {
    year: number;
    monthIndex: number;
}) => {
    const monthStart = dayjs().year(year).month(monthIndex).date(1);
    const monthEnd = monthStart.endOf('month');

    return (
        <div style={styles.calendarCard}>
            <Text strong style={{ marginBottom: 8 }}>
                {monthStart.format('MMM').toUpperCase()}
            </Text>
            <div style={{ pointerEvents: 'none' }}>
                <Calendar
                    fullscreen={false}
                    value={monthStart}
                    validRange={[monthStart, monthEnd]}
                    headerRender={() => <></>}
                />
            </div>
        </div>
    );
};

