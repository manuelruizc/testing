import _ from 'lodash';

const capitalize = (str) => {
    if (typeof str !== 'string') return '';
    if (str.length === 0) return str;
    if (str.length === 1) return str.toUpperCase();
    return _.capitalize(str);
};

export default capitalize;
