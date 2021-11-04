const delayResolve = (callback) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, 2000);
    });
};

export const delayResolveData = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
};

export default delayResolve;
