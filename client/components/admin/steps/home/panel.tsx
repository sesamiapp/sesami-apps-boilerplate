import { type CSSProperties } from 'react';
import backgroundImage from '../../../../assets/background.png';

interface HomePanelProps {
    holidays: Array<{ id: string; title: string }>;
}

export const HomePanel = ({ holidays }: HomePanelProps) => {
    if (holidays.length === 0) {
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
            {holidays.map((holiday) => (
                <div key={holiday.id}>{holiday.title}</div>
            ))}
        </div>
    );
};

const localStyles: Record<string, CSSProperties> = {
    root: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
};
