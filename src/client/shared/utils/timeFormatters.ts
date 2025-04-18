import { format } from 'date-fns';

export const formatTime = (timestamp: string | number | Date) => {
    if (!timestamp) return timestamp;

    if (typeof timestamp === 'string') timestamp = new Date(timestamp);

    return format(timestamp, 'dd.MM.yy HH:mm');
};
