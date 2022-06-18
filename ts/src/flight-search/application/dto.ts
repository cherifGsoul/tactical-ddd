import {
    InvalidCabinClass,
    InvalidFlightSearchCriteria,
    InvalidFlightTypePeriod,
    InvalidPassengers,
    InvalidRoute
} from "./types";

export type FlightSearchCriteriaDTO = {
    route: RouteDTO,
    flightTypePeriod: FlightTypePeriodDTO,
    passengers: PassengersDTO,
    cabinClass: CabinClassDTO
}

export type RouteDTO = {
    origin: string,
    destination: string
}

export type FlightTypePeriodDTO = {
    flightType: string,
    departingDate: Date,
    returningDate: Date | undefined | null
}

export type PassengersDTO = {
    adults: number,
    children: number,
    infant: number
}

export type CabinClassDTO = string

export namespace RouteDTO {
    export const toInvalidRoute =  (dto: RouteDTO): InvalidRoute => {
        const {origin, destination} = dto;
        return {
            origin,
            destination
        }
    }
}

export namespace FlightTypePeriodDTO {
    export const toInvalidFlightTypePeriod = (dto: FlightTypePeriodDTO): InvalidFlightTypePeriod => {
        return {
            flightType: dto.flightType,
            departingDate: new Date(dto.departingDate),
            returningDate:dto.returningDate
        }
    }
}

export namespace PassengersDTO {
    export const toInvalidPassengers  = (dto: PassengersDTO): InvalidPassengers => {
        return {
            adults: dto.adults,
            children: dto.children,
            infant: dto.infant
        }
    }
}

export namespace CabinClassDTO {
    export const toInvalidCabinClass = (dto: CabinClassDTO): InvalidCabinClass => {
        return dto;
    }
}

export namespace FlightSearchCriteriaDTO {
    export const toInvalidFlightSearchCriteria = (dto: FlightSearchCriteriaDTO): InvalidFlightSearchCriteria => {
        return {
            route: RouteDTO.toInvalidRoute(dto.route),
            flightTypePeriod: FlightTypePeriodDTO.toInvalidFlightTypePeriod(dto.flightTypePeriod),
            passengers: PassengersDTO.toInvalidPassengers(dto.passengers),
            cabinClass: CabinClassDTO.toInvalidCabinClass(dto.cabinClass)
        }
    }
}