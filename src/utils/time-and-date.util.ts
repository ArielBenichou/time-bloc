import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getCurrentSunday() {
    const currentDate = dayjs();

    const sunday = currentDate.day(0);

    // If the current date is after Sunday, consider it for the next week
    if (currentDate.isSameOrBefore(sunday)) {
        sunday.subtract(7, 'days');
    }

    // Set the time to 00:00
    const sundayAtMidnight = sunday.startOf('day');

    return sundayAtMidnight;
}

export function formatWeek(date: Dayjs) {
    const startOfWeek = date.startOf('week');
    const endOfWeek = date.endOf('week');

    const startMonth = startOfWeek.format('MMMM');
    const endMonth = endOfWeek.format('MMMM');
    const year = startOfWeek.format('YYYY');

    if (startMonth === endMonth) {
        return startOfWeek.format('MMMM YYYY');
    } else {
        return `${startMonth.slice(0, 3)}-${endMonth.slice(0, 3)} ${year}`;
    }
}

