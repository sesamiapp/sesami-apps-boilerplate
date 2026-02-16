import { Calendar, Typography } from 'antd';
import dayjs from 'dayjs';
import { type CSSProperties } from 'react';

const { Text } = Typography;

export const MonthGrid = ({ columns, year }: { columns: number; year: number }) => {
    return (
        <div
            style={{
                ...localStyles.grid,
                gridTemplateColumns: `repeat(${columns}, minmax(260px, 1fr))`,
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
        <div style={localStyles.calendarCard}>
            <Text strong style={localStyles.monthLabel}>
                {monthStart.format('MMM').toUpperCase()}
            </Text>
            <div style={localStyles.nonInteractiveCalendar}>
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

const localStyles: Record<string, CSSProperties> = {
    grid: {
        display: 'grid',
        gap: 12,
    },
    calendarCard: {
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        padding: 10,
        background: '#ffffff',
    },
    monthLabel: {
        marginBottom: 8,
    },
    nonInteractiveCalendar: {
        pointerEvents: 'none',
    },
};
