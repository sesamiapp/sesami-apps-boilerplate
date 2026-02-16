import { type CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        minHeight: '100vh',
        boxSizing: 'border-box',
    },
    headerSection: {
        border: '1px solid #d9d9d9',
        borderRadius: 12,
        background: '#ffffff',
        padding: 20,
    },
    panelSection: {
        border: '1px solid #d9d9d9',
        borderRadius: 12,
        background: '#ffffff',
        padding: 20,
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
    },
    leftHeaderWithControl: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
    },
    buttonRow: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
    },
    chooseServicePanel: {
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    chooseServiceLeft: {
        flex: '1 1 680px',
        display: 'flex',
        flexDirection: 'column',
    },
    chooseServiceRight: {
        flex: '0 0 280px',
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        padding: 14,
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
    },
    serviceGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    calendarCard: {
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        padding: 10,
        background: '#ffffff',
    },
};

