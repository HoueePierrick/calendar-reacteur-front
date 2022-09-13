const months = (num) => {
    const monthlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const result = monthlist[num - 1]
    return result
}

export default months;