export const formatTime = (date) => {
    if (!(date instanceof Date)) {
        throw new TypeError('Expected a Date object');
    }
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
}

export const formatBirthDay = (date) => {
    if (!(date instanceof Date)) {
        throw new TypeError('Expected a Date object');
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}