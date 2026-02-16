export type Step = 'home' | 'addHoliday' | 'chooseService';

export interface AdminState {
    step: Step;
    guideOpen: boolean;
    selectedYear: number;
    selectedTemplate: string;
    selectedServiceIds: string[];
    connecting: boolean;
}

export type AdminAction =
    | { type: 'SET_STEP'; step: Step }
    | { type: 'SET_GUIDE_OPEN'; open: boolean }
    | { type: 'SET_TEMPLATE'; template: string }
    | { type: 'SET_SERVICES'; serviceIds: string[] }
    | { type: 'SET_CONNECTING'; connecting: boolean };

export const reducer = (state: AdminState, action: AdminAction): AdminState => {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, step: action.step };
        case 'SET_GUIDE_OPEN':
            return { ...state, guideOpen: action.open };
        case 'SET_TEMPLATE':
            return { ...state, selectedTemplate: action.template };
        case 'SET_SERVICES':
            return { ...state, selectedServiceIds: action.serviceIds };
        case 'SET_CONNECTING':
            return { ...state, connecting: action.connecting };
        default:
            return state;
    }
};

export const createInitialState = (
    currentYear: number,
    initialTemplate: string,
): AdminState => ({
    step: 'home',
    guideOpen: false,
    selectedYear: currentYear,
    selectedTemplate: initialTemplate,
    selectedServiceIds: [],
    connecting: false,
});

