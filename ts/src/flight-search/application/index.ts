import {
    CheckRouteIsServed,
    FlightSearchCriteria,
    airport,
    FlightTypePeriod,
    Passengers,
    cabin,
    flightDate,
    flightType,
    route, EncryptFlightSearchCriteria, ValidateFlightSearchCriteria
} from '../domain-model';
import {
    InvalidCabinClass,
    InvalidFlightSearchCriteria,
    InvalidFlightTypePeriod,
    InvalidPassengers,
    InvalidRoute, SearchFlight
} from './types';

const toRoute = async (checkRouteIsServed: CheckRouteIsServed, invalidRoute: InvalidRoute): Promise<route.Route> => {
    let aRoute: route.Route;
    try {
        aRoute = route.between(
            airport.fromCode(invalidRoute.origin),
            airport.fromCode(invalidRoute.destination)
        );
    } catch (e) {
        throw new Error('Route is valid')
    }
    const isServed = await checkRouteIsServed(aRoute);
    if (!isServed) {
        throw new Error('Route is not served')
    }
    return aRoute
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
        if (flightDate.isAfter(returningDate, departingDate)) {
            throw new Error('Returning date must be after departing date');
        }
        flightTypePeriod = {...flightTypePeriod, returningDate}
    }
    return flightTypePeriod;
}

const toPassengers = (invalidPassengers: InvalidPassengers): Passengers => {
    if (!invalidPassengers.adults || invalidPassengers.adults === 0) {
        throw new Error('A flight must have at least one adult passenger')
    }
    const {adults} = invalidPassengers
    const infant = invalidPassengers.infant > 0 ? invalidPassengers.infant : 0;
    const children = invalidPassengers.children > 0 ? invalidPassengers.children : 0;

    const seats = adults + children;

    if (seats > 9) {
        throw new Error('Number of seats must not be more than 9 ')
    }

    if (infant > adults) {
        throw new Error('Infant seats should not be more than adult seats');
    }

    return {
        adults,
        children,
        infant
    }
}

const toCabinClass = (invalidCabinClass: InvalidCabinClass): cabin.Cabin => {
    return cabin.from(invalidCabinClass);
}
const validateFlightSearchCriteria: ValidateFlightSearchCriteria = async (checkRouteIsServed: CheckRouteIsServed,
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

export const searchFlight = (checkRouteIsServed: CheckRouteIsServed, encryptFlightSearchCriteria: EncryptFlightSearchCriteria): SearchFlight => {
    return async (invalidCriteria: InvalidFlightSearchCriteria): Promise<string> => {
        try {
            const criteria = await validateFlightSearchCriteria(checkRouteIsServed, invalidCriteria);
            return await encryptFlightSearchCriteria(criteria);
        } catch (e: any) {
            throw new Error(e.message)
        }
    }
}