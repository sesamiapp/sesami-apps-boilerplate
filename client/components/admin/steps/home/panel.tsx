import { Button } from 'antd';
import { type CSSProperties } from 'react';

interface HomePanelProps {
    resources: Array<{
        id: string;
        cursor: string;
        name: string;
        type: string;
        timezone: string;
        status: boolean;
        email: string;
        mobile: string;
        shopId: string;
        description: string;
        eventDescription: string;
    }>;
}

export const HomePanel = ({ resources }: HomePanelProps) => {
    if (resources.length === 0) {
        return (
            <div style={{ ...localStyles.root, ...localStyles.emptyRoot }}>
                <h2>
                    in order to use official holiday app please click on apply
                    holiday.
                </h2>
                <p>
                    by choosing a country you can create sesami resource for it
                    and then apply the resource to any service you want
                </p>
            </div>
        );
    }

    return (
        <div style={localStyles.root}>
            <div style={localStyles.tableWrapper}>
                <div style={localStyles.table}>
                    <div style={{ ...localStyles.row, ...localStyles.headerRow }}>
                        <div style={localStyles.cell}>id</div>
                        <div style={localStyles.cell}>name</div>
                        <div style={localStyles.cell}>type</div>
                        <div style={localStyles.cell}>timezone</div>
                        <div style={localStyles.cell}>status</div>
                        <div style={localStyles.cell}>email</div>
                        <div style={localStyles.cell}>mobile</div>
                        <div style={localStyles.cell}>shopId</div>
                        <div style={localStyles.cell}>description</div>
                        <div style={localStyles.cell}>eventDescription</div>
                        <div style={localStyles.actionsCell}></div>
                    </div>

                    {resources.map((resource) => (
                        <div key={resource.id} style={localStyles.row}>
                            <div style={localStyles.cell}>{resource.id}</div>
                            <div style={localStyles.cell}>{resource.name}</div>
                            <div style={localStyles.cell}>{resource.type}</div>
                            <div style={localStyles.cell}>{resource.timezone}</div>
                            <div style={localStyles.cell}>
                                {resource.status ? 'true' : 'false'}
                            </div>
                            <div style={localStyles.cell}>
                                {resource.email || '-'}
                            </div>
                            <div style={localStyles.cell}>
                                {resource.mobile || '-'}
                            </div>
                            <div style={localStyles.cell}>{resource.shopId}</div>
                            <div style={localStyles.cell}>
                                {resource.description || '-'}
                            </div>
                            <div style={localStyles.cell}>
                                {resource.eventDescription || '-'}
                            </div>
                            <div style={localStyles.actionsCell}>
                                <Button
                                    style={localStyles.applyButton}
                                    type="primary"
                                >
                                    Apply To Service
                                </Button>
                                <Button style={localStyles.editButton}>Edit</Button>
                                <Button style={localStyles.removeButton}>Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const localStyles: Record<string, CSSProperties> = {
    root: {
        width: '100%',
    },
    emptyRoot: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        textTransform: 'capitalize',
    },
    table: {
        minWidth: 1500,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableWrapper: {
        width: '100%',
        overflowX: 'auto',
    },
    row: {
        display: 'grid',
        gridTemplateColumns:
            '120px 180px 110px 170px 90px 180px 140px 120px 180px 200px minmax(260px, 1fr)',
        alignItems: 'center',
        minHeight: 52,
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
    },
    headerRow: {
        background: '#f9fafb',
        fontWeight: 600,
        color: '#4b5563',
        minHeight: 48,
    },
    cell: {
        padding: '0 8px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    actionsCell: {
        padding: '0 8px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10,
    },
    applyButton: {
        background: '#179d21',
        borderColor: '#179d21',
        color: '#ffffff',
    },
    editButton: {
        background: '#6d63ff',
        borderColor: '#6d63ff',
        color: '#ffffff',
    },
    removeButton: {
        background: '#ff5c65',
        borderColor: '#ff5c65',
        color: '#ffffff',
    },
};
