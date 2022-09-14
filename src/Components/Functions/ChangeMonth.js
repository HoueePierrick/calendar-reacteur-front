const ChangeMonth = (array, str) => {
    let result = []
    let pushedMonth = ""
    let newMonth = 0
    if(str==="increase") {
        if(array[1] === 12) {
            result = [array[0], "01", array[2] + 1]
        } else {
            if(array[1] + 1 < 10) {
                newMonth = Number(array[1]) + 1
                pushedMonth = `0${newMonth}`
            } else {
                pushedMonth = Number(array[1]) + 1
            }
            result = [array[0], pushedMonth, array[2]]
        }
        console.log(result)
        return result;
    } else if (str === "decrease") {
        if(array[1] === 1) {
            result = [array[0], 12, array[2] - 1]
        } else {
            if(array[1] - 1 < 10) {
                newMonth = Number(array[1]) - 1
                pushedMonth = `0${newMonth}`
            } else {
                pushedMonth = Number(array[1]) - 1
            }
            result = [array[0], pushedMonth, array[2]]
        }
        return result;
    } else {
        console.log("Please enter a correct order: increase or decrease")
    }
}

export default ChangeMonth