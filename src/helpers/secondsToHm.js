export function secondsToHm(d) {
    d = Number(d)
    const m = Math.floor(d % 3600 / 60)
    const mDisplay = m.toLocaleString('nl', {minimumIntegerDigits: 2, useGrouping:false})
    return Math.floor(d / 3600) +':'+ mDisplay
}