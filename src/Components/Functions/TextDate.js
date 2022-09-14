import months from "./Months";

const textDate = (array) => {
    let result = ""
    const [day, month, year] = array
    result = months(month) + " " + day + ", " + year
    return result;
};

export default textDate