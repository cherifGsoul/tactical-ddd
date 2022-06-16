import {
    CheckRouteIsServed,
    FlightSearchCriteria,
    Route,
    airport,
    FlightTypePeriod,
    ValidateFlightSearchCriteria,
    Passengers,
    CabinClass,
    flightDate,
    flightType
} from "../domain-model/types";
import {
    InvalidCabinClass,
    InvalidFlightSearchCriteria,
    InvalidFlightTypePeriod,
    InvalidPassengers,
    InvalidRoute
} from "./types";

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

const toFlightTypePeriod = (invalidFlightTypePeriod: InvalidFlightTypePeriod) => {
    const departingDate = flightDate.fromDate(invalidFlightTypePeriod.departingDate)
    const type = flightType.from(invalidFlightTypePeriod.flightType)

    let flightTypePeriod: FlightTypePeriod = {
        returningDate: undefined,
        flightType: type,
        departingDate: departingDate
    }

    if (type === flightType.from(flightType.FlightTypeEnum.ROUND_TRIP)) {
        if (!invalidFlightTypePeriod.returningDate) {
            throw new Error('Round trip flights must have a returning date');
        }
        const returningDate = flightDate.fromDate(invalidFlightTypePeriod.returningDate)
        flightTypePeriod = {...flightTypePeriod, returningDate}
    }
    return flightTypePeriod;
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
    return invalidCabinClass as CabinClass
}
const validateFlightSearchCriteria = async (checkRouteIsServed: CheckRouteIsServed,
                                            invalidCriteria: InvalidFlightSearchCriteria): Promise<FlightSearchCriteria> => {
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

export const searchFlight = (checkRouteIsServed: CheckRouteIsServed): ValidateFlightSearchCriteria => {
    return async (invalidCriteria: InvalidFlightSearchCriteria): Promise<FlightSearchCriteria> => {
        // validate route
        return await validateFlightSearchCriteria(checkRouteIsServed, invalidCriteria);

        //
    }
}