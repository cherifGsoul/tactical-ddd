import dayjs from "dayjs";

export type FlightDate = Date;

const isDate = (d: unknown): d is Date => {
    return Object.prototype.toString.call(d) === '[object Date]'
}

export const fromDate = (date: Date): FlightDate => {
    if (!isDate(date)) throw new Error('Flight date must be a valid date')
    const dayDate = dayjs(date)
    const today = dayjs();
    if (dayDate.isBefore(today)) {
        throw new Error('departing date must be in the future')
    }
    return date;
}

export const isAfter = (date: Date, other: Date) => {
    const dayDate = dayjs(date);
    const otherDay = dayjs(other);
    return dayDate.isAfter(otherDay);
}