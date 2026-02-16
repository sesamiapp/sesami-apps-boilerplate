import { Calendar, Typography } from 'antd';
import dayjs from 'dayjs';
import { type CSSProperties } from 'react';

const { Text } = Typography;

export const MonthGrid = ({
    columns,
    year,
}: {
    columns: number;
    year: number;
}) => {
    const rows = Math.ceil(12 / columns);
    const gridSidePadding = 0;
    const cardSidePadding = '2vw';
    const viewportOffset = 'clamp(220px, 5vw, 420px)';
    const cardHeight = `calc((100vh - ${viewportOffset} - ${rows - 1}px) / ${rows})`;

    return (
        <>
            <style>{calendarCellCss}</style>
            <div
                style={{
                    ...localStyles.grid,
                    paddingInline: gridSidePadding,
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    height: '100%',
                }}
            >
                {Array.from({ length: 12 }, (_, monthIndex) => (
                    <MonthCalendarCard
                        key={monthIndex}
                        year={year}
                        monthIndex={monthIndex}
                        cardHeight={cardHeight}
                        cardSidePadding={cardSidePadding}
                    />
                ))}
            </div>
        </>
    );
};

const MonthCalendarCard = ({
    year,
    monthIndex,
    cardHeight,
    cardSidePadding,
}: {
    year: number;
    monthIndex: number;
    cardHeight: string;
    cardSidePadding: string;
}) => {
    const monthStart = dayjs().year(year).month(monthIndex).date(1);

    return (
        <div
            style={{
                ...localStyles.calendarCard,
                height: cardHeight,
                paddingInline: cardSidePadding,
            }}
        >
            <Text strong style={localStyles.monthLabel}>
                {monthStart.format('MMM').toUpperCase()}
            </Text>
            <div
                style={localStyles.calendarViewport}
                className="month-grid-calendar-viewport"
            >
                <div className="month-grid-calendar-host">
                    <Calendar
                        className="month-grid-calendar"
                        fullscreen={false}
                        value={monthStart}
                        headerRender={() => <></>}
                    />
                </div>
            </div>
        </div>
    );
};

const localStyles: Record<string, CSSProperties> = {
    grid: {
        display: 'grid',
        justifyItems: 'stretch',
        alignItems: 'start',
    },
    calendarCard: {
        background: '#ffffff',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    monthLabel: {
        marginBottom: 8,
        flex: '0 0 auto',
    },
    calendarViewport: {
        flex: '1 1 auto',
        overflow: 'hidden',
        minHeight: 0,
    },
};

const calendarCellCss = `
.month-grid-calendar-viewport .month-grid-calendar-host {
    height: 100%;
}

.month-grid-calendar-viewport .month-grid-calendar,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-panel,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-date-panel,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-body {
    height: 100%;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-content {
    width: 100%;
    height: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 2px;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-content thead tr,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-content tbody tr {
    height: calc(100% / 7);
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-content th,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-content td {
    width: calc(100% / 7);
    padding: 0;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell {
    padding: 0;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-inner {
    min-height: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-selected .ant-picker-cell-inner,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-range-start .ant-picker-cell-inner,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-range-end .ant-picker-cell-inner,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-in-range .ant-picker-cell-inner {
    background: transparent !important;
    color: inherit !important;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-today .ant-picker-cell-inner::before {
    border: 0 !important;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell:not(.ant-picker-cell-in-view),
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-disabled,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-disabled .ant-picker-cell-inner {
    background: transparent !important;
}

.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner,
.month-grid-calendar-viewport .month-grid-calendar .ant-picker-cell-disabled .ant-picker-cell-inner {
    color: #bfbfbf !important;
}
`;
