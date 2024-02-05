export const sleep = (timeInSeconds: number) => new Promise(res => setTimeout(res, timeInSeconds * 1000))
