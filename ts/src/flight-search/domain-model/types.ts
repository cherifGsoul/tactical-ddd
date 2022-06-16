import {InvalidFlightSearchCriteria} from "../application/types";
import {Airport} from "./airport";
import {FlightType} from "./flight-type";
import {FlightDate} from "./flight-date";

export type CheckRouteIsServed = (route: Route) => Promise<boolean>

export type ValidateFlightSearchCriteria = (invalidFlightSearchCriteria: InvalidFlightSearchCriteria) => Promise<FlightSearchCriteria>

export type Route = Readonly<{
    origin: Airport,
    destination: Airport
}>

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

export type CabinClass = Readonly<'economic' | 'business' | 'first'>

export type FlightSearchCriteria = Readonly<{
    route: Route,
    flightTypePeriod: FlightTypePeriod,
    passengers: Passengers,
    cabinClass: CabinClass
}>

export * as airport from './airport'
export * as flightDate from './flight-date'
export * as flightType from './flight-type'
