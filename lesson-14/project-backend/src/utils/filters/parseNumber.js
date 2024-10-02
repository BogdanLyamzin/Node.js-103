const parseInteger = value => {
    if(typeof value !== "string") return;

    const parsedNumber = parseInt(value);
    if(Number.isNaN(parsedNumber)) return;

    return parsedNumber;
};

export default parseInteger;