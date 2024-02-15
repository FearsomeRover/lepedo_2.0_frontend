export function formatAmount(number: number): string {
    let strNumber = number.toString()

    if (strNumber.length <= 3) {
        return strNumber
    }

    let result = ''

    for (let i = strNumber.length - 1, count = 0; i >= 0; i--) {
        result = strNumber[i] + result
        count++
        if (count % 3 === 0 && i !== 0) {
            result = ' ' + result
        }
    }

    return result
}
