import {
    CheckRouteIsServed,
    FlightSearchCriteria,
    Route,
    airport,
    FlightTypeEnum,
    FlightTypePeriod, FlightType, ValidateFlightSearchCriteria, Passengers, CabinClass
} from "../domain-model/types";
import {
    InvalidCabinClass,
    InvalidFlightSearchCriteria,
    InvalidFlightTypePeriod,
    InvalidPassengers,
    InvalidRoute
} from "./types";
import dayjs from "dayjs";

const toRoute = async (checkRouteIsServed: CheckRouteIsServed, invalidRoute: InvalidRoute): Promise<Route> => {
    try {
        const route: Route = {
            origin: airport.fromCode(invalidRoute.origin),
            destination: airport.fromCode(invalidRoute.destination)
        }
        const isServed = await checkRouteIsServed(route);
        if (!isServed) {
            throw new Error('Route is not served')
        }
        return route
    } catch (e) {
        new Error(e.message)
    }
}

const isDate = (d: unknown): d is Date => {
    return Object.prototype.toString.call(d) === '[object Date]'
}
const toFlightTypePeriod = (invalidFlightTypePeriod: InvalidFlightTypePeriod) => {
    const {departingDate, flightType} = invalidFlightTypePeriod
    if (!isDate(departingDate)) {
        throw new Error('departing date must be valid date')
    }
    const dayDepartingDate = dayjs(departingDate)
    const today = dayjs();
    if (dayDepartingDate.isBefore(today)) {
        throw new Error('departing date must be in the future')
    }

    let flightTypePeriod: FlightTypePeriod = {
        returningDate: undefined,
        flightType: flightType as FlightType,
        departingDate: dayDepartingDate.toDate()
    }

    if (flightType === FlightTypeEnum.ROUND_TRIP) {
        if (!isDate(invalidFlightTypePeriod.returningDate)) {
            throw new Error('returning date must be a valid date for round trip flights');
        }

        const dayReturningDate = dayjs(invalidFlightTypePeriod.returningDate)
        if (dayReturningDate.isBefore(today)) {
            throw new Error('departing date must be in the future')
        }

        if (dayReturningDate.isBefore(dayDepartingDate)) {
            throw new Error('returning date must be after departing date')
        }

        flightTypePeriod = {...flightTypePeriod,returningDate: invalidFlightTypePeriod.returningDate}
    }

    return flightTypePeriod
}

const toPassengers = (invalidPassengers: InvalidPassengers): Passengers => {
    const {adults, children, infant} = invalidPassengers
    if (adults === 0) {

    }
    return {
        adults,
        children,
        infant
    }
}

const toCabinClass = (invalidCabinClass: InvalidCabinClass): CabinClass => {
    return <"economic" | "business" | "first">invalidCabinClass
}
const validateFlightSearchCriteria = async (checkRouteIsServed: CheckRouteIsServed, invalidCriteria: InvalidFlightSearchCriteria): Promise<FlightSearchCriteria> => {
    const route = await toRoute(checkRouteIsServed, invalidCriteria.route)
    const flightTypePeriod = toFlightTypePeriod(invalidCriteria.flightTypePeriod)
    const passengers = toPassengers(invalidCriteria.passengers);
    const cabinClass = toCabinClass(invalidCriteria.cabinClass);
    return {
        route,
        flightTypePeriod,
        passengers,
        cabinClass
    }
}

export const searchFlight = (checkRouteIsServed: CheckRouteIsServed): ValidateFlightSearchCriteria => async (invalidCriteria: InvalidFlightSearchCriteria): Promise<FlightSearchCriteria> => {
    // validate route
    return await validateFlightSearchCriteria(checkRouteIsServed, invalidCriteria);

    //
}