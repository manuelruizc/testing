import eventsList from './eventsList';

const userId = 123;

const isPastDate = (date) =>
    date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

const futurePublicEventsList = () => {
    return eventsList.filter(
        ({ startDateTime, hostId, isPrivate }) =>
            !isPastDate(startDateTime) &&
            hostId !== userId &&
            isPrivate === false
    );
};

export default futurePublicEventsList;
