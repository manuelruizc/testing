import moment from 'moment';

export default function (date, amount, unit) {
    return moment(date).add(amount, unit);
}
