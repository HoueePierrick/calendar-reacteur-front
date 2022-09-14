const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
};

const MonthDays = (array) => {
    const strDate = `${array[1]} / 01 / ${array[2]}`
    const firstDay = new Date(Date.parse(strDate)).getDay()
    const monthlength = getDays(array[2], array[1])
    let week = []
    let weekOne = []
    let result = []
    let weekNum = 1;
    let realday = firstDay;

    for(let j = 0; j <= 6; j++) {
        if(j < firstDay) {
            weekOne.push(" ")
        }
    }

    for(let i = 1; i <= monthlength; i++) {
        realday = (firstDay + i - 1) % 7
        weekNum = 1 + Math.floor((firstDay + i - 1) / 7)
        if(weekNum === 1) {
            weekOne.push(i)
        } else if(weekNum === 2 && realday === 0) {
            result.push(weekOne)
            week.push(i)
        } else if(realday === 0) {
            result.push(week)
            week = [i]
        } else {
            week.push(i)
        }
        if(i === monthlength) {
            for(let i = week.length; i < 7; i++) {
                week.push(" ")
            }
            result.push(week)
        }
    }
    // console.log(result)
    return result;
}

// MonthDays([14, 09, 2022])

export default MonthDays