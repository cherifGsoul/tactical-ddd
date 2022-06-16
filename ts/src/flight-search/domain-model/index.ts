import {InvalidFlightSearchCriteria} from "../application/types";
import {FlightType} from "./flight-type";
import {FlightDate} from "./flight-date";
import {Cabin} from "./cabin";
import {Route} from "./route";

export type CheckRouteIsServed = (route: Route) => Promise<boolean>

export type ValidateFlightSearchCriteria = (checkRouteIsServed: CheckRouteIsServed, invalidFlightSearchCriteria: InvalidFlightSearchCriteria) => Promise<FlightSearchCriteria>

export type EncryptFlightSearchCriteria = (flightSearchCriteria: FlightSearchCriteria) => Promise<string>

export type FlightTypePeriod = Readonly<{
    flightType: FlightType,
    departingDate: FlightDate,
    returningDate: FlightDate | undefined | null,
}>

export type Passengers = Readonly<{
    adults: number,
    children: number,
    infant: number
}>

export type FlightSearchCriteria = Readonly<{
    route: Route,
    flightTypePeriod: FlightTypePeriod,
    passengers: Passengers,
    cabinClass: Cabin
}>

export * as airport from './airport'
export * as flightDate from './flight-date'
export * as flightType from './flight-type'
export * as cabin from './cabin'
export * as route from './route';
