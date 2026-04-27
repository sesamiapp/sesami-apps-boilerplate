export type Step = 'home' | 'addHoliday' | 'chooseService';

export interface ResourceDraft {
    typeId: string;
    name: string;
    timezone: string;
}

export interface AdminState {
    step: Step;
    guideOpen: boolean;
    selectedYear: number;
    selectedCountryCode: string;
    selectedServiceIds: string[];
    connecting: boolean;
    resourceDraft: ResourceDraft;
    createdResourceId: string | null;
}

export type AdminAction =
    | { type: 'SET_STEP'; step: Step }
    | { type: 'SET_GUIDE_OPEN'; open: boolean }
    | { type: 'SET_COUNTRY'; countryCode: string }
    | { type: 'SET_SERVICES'; serviceIds: string[] }
    | { type: 'SET_CONNECTING'; connecting: boolean }
    | { type: 'SET_RESOURCE_DRAFT'; draft: Partial<ResourceDraft> }
    | { type: 'SET_CREATED_RESOURCE_ID'; id: string | null };

export const reducer = (state: AdminState, action: AdminAction): AdminState => {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, step: action.step };
        case 'SET_GUIDE_OPEN':
            return { ...state, guideOpen: action.open };
        case 'SET_COUNTRY':
            return { ...state, selectedCountryCode: action.countryCode };
        case 'SET_SERVICES':
            return { ...state, selectedServiceIds: action.serviceIds };
        case 'SET_CONNECTING':
            return { ...state, connecting: action.connecting };
        case 'SET_RESOURCE_DRAFT':
            return {
                ...state,
                resourceDraft: { ...state.resourceDraft, ...action.draft },
            };
        case 'SET_CREATED_RESOURCE_ID':
            return { ...state, createdResourceId: action.id };
        default:
            return state;
    }
};

export const createInitialState = (
    currentYear: number,
    initialCountryCode: string,
): AdminState => ({
    step: 'home',
    guideOpen: false,
    selectedYear: currentYear,
    selectedCountryCode: initialCountryCode,
    selectedServiceIds: [],
    connecting: false,
    resourceDraft: {
        typeId: '',
        name: '',
        timezone:
            typeof Intl !== 'undefined'
                ? Intl.DateTimeFormat().resolvedOptions().timeZone
                : 'UTC',
    },
    createdResourceId: null,
});
