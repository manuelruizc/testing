import moment from 'moment';

export default function (date, amount, unit) {
    return moment(date).subtract(amount, unit);
}
