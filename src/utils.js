const currentDateTimeString = () => {
    const today = new Date();
    const datetimeString = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    return datetimeString
}

export {
    currentDateTimeString
}
