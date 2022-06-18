import {EncryptFlightSearchCriteria, FlightSearchCriteria} from "../../domain-model";

export const fakeEncryptFlightSearchCriteria: EncryptFlightSearchCriteria = async (flightSearchCriteria: FlightSearchCriteria): Promise<string> => {
    return JSON.stringify(flightSearchCriteria)
}
export * as inMemoryRouteIsServed from './in-memory-check-route-is-served'