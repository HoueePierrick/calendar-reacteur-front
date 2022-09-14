const getDate = (array) => {
    const [day, month, year] = array
    return new Date(year, month, day);
};

export default getDate