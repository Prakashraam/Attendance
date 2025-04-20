import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { SHIFTS } from './constants';

export const formatDate = (date) => format(date, 'yyyy-MM-dd');
export const formatTime = (date) => format(date, 'HH:mm');
export const formatDateTime = (date) => format(date, 'yyyy-MM-dd HH:mm');

export const isInShift = (time, shift) => {
    const currentDate = new Date();
    const shiftStart = parseISO(`${formatDate(currentDate)}T${shift.startTime}`);
    const shiftEnd = parseISO(`${formatDate(currentDate)}T${shift.endTime}`);

    return isWithinInterval(time, { start: shiftStart, end: shiftEnd });
};

export const getCurrentShift = () => {
    const now = new Date();
    return Object.values(SHIFTS).find(shift => isInShift(now, shift)) || null;
};
