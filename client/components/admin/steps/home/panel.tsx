interface HomePanelProps {
    holidays: Array<{ id: string; title: string }>;
}

export const HomePanel = ({ holidays }: HomePanelProps) => {
    if (holidays.length === 0) {
        return (
            <div>
                <h2>
                    in order to use official holiday app please click on apply
                    holiday.
                </h2>
            </div>
        );
    }

    return (
        <div>
            {holidays.map((holiday) => (
                <div key={holiday.id}>{holiday.title}</div>
            ))}
        </div>
    );
};
