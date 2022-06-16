export type InvalidFlightSearchCriteria = {
    route: InvalidRoute,
    flightTypePeriod: InvalidFlightTypePeriod,
    passengers: InvalidPassengers,
    cabinClass: InvalidCabinClass
}

export type InvalidRoute = {
    origin: string,
    destination: string
}

export type InvalidFlightTypePeriod = {
    flightType: string,
    departingDate: Date,
    returningDate: Date | undefined | null
}

export type InvalidPassengers = {
    adults: number,
    children: number,
    infant: number
}

export type InvalidCabinClass = string