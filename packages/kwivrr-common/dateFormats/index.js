import moment from 'moment';
import { format } from 'date-fns';

const convert24to12Time = (time24) => {
    const [hour, minutes] = time24.split(':');
    var suffix = hour >= 12 ? 'PM' : 'AM';
    var hours = hour % 12;
    return hours + ':' + minutes + ' ' + suffix;
};

export function defaultTimeFormat(date) {
    return moment(date).fromNow();
}

export function defaultDateFormat(date) {
    // return format(new Date(date), 'Pp');
    // console.log('date', (date));
    return date;
    let dateToFormat = date;
    if (typeof date !== 'string') {
        dateToFormat = new Date(date);
    }
    return moment(date).format('ddd, MMM/DD/YYYY, hh:mm A');
}

export function formatDate(date, placeholder = null) {
    if (placeholder === '00:00') {
        return convert24to12Time(date.substr(16, 5));
    }
    if (date === '') return '00/00/0000 00:00:00';
    return defaultDateFormat(date);
}

export function notificationsHeaderDateFormat(date) {
    return moment(new Date(date)).format('MMM DD, YY');
}

export function formatDateOnlyTime(date) {
    return moment(date).format('hh:mm A');
}

export function defaultDateCalendarFormat(date) {
    return moment(date).format('YYYY-MM-DD');
}
