import { type CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
        height: '100%',
        boxSizing: 'border-box',
    },
    headerSection: {
        background: '#ffffff',
    },
    panelSection: {
        background: '#ffffff',
        height: '100%',
        width: '100%',
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
