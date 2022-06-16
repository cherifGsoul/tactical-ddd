import {InvalidFlightSearchCriteria} from "../application/types";
import {Airport} from "./airport";
import {FlightType} from "./flight-type";

export type CheckRouteIsServed = (route: Route) => Promise<boolean>

export type ValidateFlightSearchCriteria = (invalidFlightSearchCriteria: InvalidFlightSearchCriteria) => Promise<FlightSearchCriteria>

export type Route = Readonly<{
    origin: Airport,
    destination: Airport
}>

export type FlightTypePeriod = Readonly<{
    flightType: FlightType,
    departingDate: Date,
    returningDate: Date | undefined | null,
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
