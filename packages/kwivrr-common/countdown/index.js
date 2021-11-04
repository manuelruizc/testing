export default function (endDate, nowDate) {
    const total = Date.parse(endDate) - Date.parse(nowDate);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}
