const isLeapYear = year => {
    const date = new Date(year, 0, 2);

    return date.getDate === 29;
}

export default isLeapYear;