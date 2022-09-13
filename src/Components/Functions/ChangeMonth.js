const ChangeMonth = (array, str) => {
    let result = []
    let pushedMonth = ""
    if(str==="increase") {
        if(array[1] === 12) {
            result = [array[0], "01", array[2] + 1]
        } else {
            if(array[1] + 1 < 10) {
                pushedMonth = `0+${array[1] + 1}`
            } else {
                pushedMonth = array[1] + 1
            }
            result = [array[0], pushedMonth, array[2]]
        }
        return result;
    } else if (str === "decrease") {
        if(array[1] === 1) {
            result = [array[0], 12, array[2] - 1]
        } else {
            if(array[1] - 1 < 10) {
                pushedMonth = `0+${array[1] - 1}`
            } else {
                pushedMonth = array[1] - 1
            }
            result = [array[0], pushedMonth, array[2]]
        }
        return result;
    } else {
        console.log("Please enter a correct order: increase or decrease")
    }
}

export default ChangeMonth