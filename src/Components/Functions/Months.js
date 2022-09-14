const months = (num) => {
    const monthlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const number = Number(num)
    const result = monthlist[number - 1]
    return result
}

export default months;