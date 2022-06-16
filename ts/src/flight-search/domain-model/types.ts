import {InvalidFlightSearchCriteria} from "../application/types";
import {Airport} from "./airport";

export type CheckRouteIsServed = (route: Route) => Promise<boolean>

export type ValidateFlightSearchCriteria = (invalidFlightSearchCriteria: InvalidFlightSearchCriteria) => Promise<FlightSearchCriteria>

export type Route = {
    origin: Airport,
    destination: Airport
}

export enum FlightTypeEnum {
    ONE_WAY = 'one-way',
    ROUND_TRIP = 'round-trip'
}
export type FlightType = FlightTypeEnum.ONE_WAY | FlightTypeEnum.ROUND_TRIP

export type FlightTypePeriod = {
    flightType: FlightType,
    departingDate: Date,
    returningDate: Date | undefined | null,
}

export type Passengers = {
    adults: number,
    children: number,
    infant: number
}

export type CabinClass = 'economic' | 'business' | 'first'

export type FlightSearchCriteria = {
    route: Route,
    flightTypePeriod: FlightTypePeriod,
    passengers: Passengers,
    cabinClass: CabinClass
}

export * as airport from './airport'