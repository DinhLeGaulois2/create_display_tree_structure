const to2Decimals = num => { return Math.floor(num * 100) / 100 }

const showDate = (d, isWithMonthName) => {
    const arr = d.split("_")

    if (isWithMonthName === undefined) {
        if (arr.length > 2 && arr[2].length > 0)
            return arr[1] + '/' + arr[2] + '/' + arr[0]
        return arr[1] + '/' + arr[0]
    }
    else if (isWithMonthName === true) {
        const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const monthInd = parseInt(arr[1], 10) - 1

        if (arr.length > 2 && arr[2].length > 0) {
            return monthNames[monthInd] + ' ' + arr[2] + ' ' + arr[0]
        }
        return monthNames[monthInd] + ' ' + arr[0]
    }
}

// Desc
const sorting = (a, b) => {
    if (a.byDate > b.byDate)
        return -1;
    if (a.byDate < b.byDate)
        return 1;
    return 0;
}

const showBigNum = value => {
    let num = Math.floor(value * 100) / 100

    let result = ""
    const dec = Math.floor(num * 100) % 100
    const setDec = () => {
        if (dec > 0) {
            if (dec < 10) result = ".0" + dec
            else result = "." + dec
        }
        else result += ".00"
    }
    setDec()

    let isFirstThree = true
    let remaining = num

    while (remaining > 0) {
        let val2 = Math.floor(remaining % 1000)
        remaining = Math.floor(remaining / 1000)
        if (isFirstThree) {
            if (remaining > 0) {
                if (val2 === 0) result = "000" + result
                else if (val2 < 10) result = "00" + val2 + result
                else if (val2 < 100) result = "0" + val2 + result
                else result = val2 + result
            }
            else result = val2 + result
            isFirstThree = false
        }
        else {
            if (remaining > 0) {
                if (val2 === 0) result = "000" + "," + result
                else if (val2 < 10) result = "00" + val2 + "," + result
                else if (val2 < 100) result = "0" + val2 + "," + result
                else result = val2 + "," + result
            }
            else result = val2 + ',' + result
        }
    }
    return result
}