const randomProperty = function (obj) {
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

export default randomProperty;
