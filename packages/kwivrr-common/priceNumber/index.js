function priceNumber(number) {
    if (typeof number !== 'number') return undefined;
    return number.toFixed(2);
}

export default priceNumber;
