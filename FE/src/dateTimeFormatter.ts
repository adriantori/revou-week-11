function zeroPad(value: number, length: number): string {
    return value.toString().length >= length ? value.toString() : ("0" + value).slice(-length);
}

export default function dateTimeFormatter(dates: string){
    const timestampStr: string = dates;
    const timestamp: Date = new Date(timestampStr);
    const formattedTimestamp: string = `${zeroPad(timestamp.getDate(), 2)}-${zeroPad(
        timestamp.getMonth() + 1,
        2
    )}-${timestamp.getFullYear()} - ${zeroPad(timestamp.getHours(), 2)}:${zeroPad(
        timestamp.getMinutes(),
        2
    )}`;

    return formattedTimestamp;
}


