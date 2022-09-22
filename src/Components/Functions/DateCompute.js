const DateCompute = (date, hour, minute) => {    
    let result = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]), hour, minute)
    console.log(result)
}

export default DateCompute