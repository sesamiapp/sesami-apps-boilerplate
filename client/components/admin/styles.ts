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
        flex: 1,
        display: 'flex',
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
    },
    buttonRow: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
    },
};
