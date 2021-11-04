import moment from 'moment';

const isEventLive = (startDate, endDate = new Date()) => {
    return (
        moment(startDate).isSameOrBefore(moment(new Date())) &&
        moment(endDate).isSameOrAfter(moment(new Date()))
    );
};

export default isEventLive;
