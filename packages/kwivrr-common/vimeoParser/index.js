const vimeo_parser = (url) => {
    const numbers = url.match(/\d+/g);
    const number = numbers.find((num) => String(num).length >= 8);
    return number;
};

export default vimeo_parser;
