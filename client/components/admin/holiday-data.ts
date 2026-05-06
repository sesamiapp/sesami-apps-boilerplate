import Holidays from 'date-holidays';
import dayjs from 'dayjs';

export interface CountryOption {
    label: string;
    value: string;
}

interface HolidayData {
    date?: string;
    start?: Date;
    name?: string;
}

export const getCountryOptions = (): CountryOption[] => {
    const holidays = new Holidays();
    const countries = holidays.getCountries('en') as Record<string, string>;

    return Object.entries(countries)
        .map(([countryCode, countryName]) => ({
            value: countryCode,
            label: countryName,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
};

export const getHolidaysByDate = (
    countryCode: string,
    year: number,
): Record<string, string[]> => {
    let holidayList: HolidayData[] = [];
    try {
        const holidays = new Holidays(countryCode);
        holidayList = holidays.getHolidays(year) as HolidayData[];
    } catch (_error) {
        return {};
    }

    const holidaysByDate: Record<string, string[]> = {};

    holidayList.forEach((holiday) => {
        const dateKey = resolveDateKey(holiday);
        const holidayName = holiday.name?.trim();

        if (!dateKey || !holidayName) {
            return;
        }

        if (!holidaysByDate[dateKey]) {
            holidaysByDate[dateKey] = [];
        }

        if (!holidaysByDate[dateKey].includes(holidayName)) {
            holidaysByDate[dateKey].push(holidayName);
        }
    });

    return holidaysByDate;
};

export const getCountryShortName = (countryCode: string): string => {
    const upper = countryCode.toUpperCase();
    const map: Record<string, string> = {
        US: 'USA',
        GB: 'UK',
        AE: 'UAE',
    };
    return map[upper] ?? upper;
};

export const getSuggestedTimezones = (countryCode: string): string[] => {
    const upper = countryCode.toUpperCase();
    const map: Record<string, string[]> = {
        US: [
            'America/New_York',
            'America/Chicago',
            'America/Denver',
            'America/Los_Angeles',
        ],
        GB: ['Europe/London'],
        IR: ['Asia/Tehran'],
        FR: ['Europe/Paris'],
        DE: ['Europe/Berlin'],
        ES: ['Europe/Madrid'],
        IT: ['Europe/Rome'],
        AE: ['Asia/Dubai'],
        TR: ['Europe/Istanbul'],
        CA: ['America/Toronto', 'America/Vancouver'],
        AU: ['Australia/Sydney', 'Australia/Perth'],
        IN: ['Asia/Kolkata'],
        JP: ['Asia/Tokyo'],
    };
    return map[upper] ?? [];
};

const resolveDateKey = (holiday: HolidayData): string | null => {
    if (holiday.date) {
        return holiday.date.slice(0, 10);
    }

    if (holiday.start) {
        return dayjs(holiday.start).format('YYYY-MM-DD');
    }

    return null;
};
