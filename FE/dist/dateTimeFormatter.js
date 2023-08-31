function zeroPad(value, length) {
    return value.toString().length >= length ? value.toString() : ("0" + value).slice(-length);
}
export default function dateTimeFormatter(dates) {
    const timestampStr = dates;
    const timestamp = new Date(timestampStr);
    const formattedTimestamp = `${zeroPad(timestamp.getDate(), 2)}-${zeroPad(timestamp.getMonth() + 1, 2)}-${timestamp.getFullYear()} - ${zeroPad(timestamp.getHours(), 2)}:${zeroPad(timestamp.getMinutes(), 2)}`;
    return formattedTimestamp;
}
