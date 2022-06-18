import * as airport from "./airport";

export function toString(aRoute: Route) {
    return `${aRoute.origin}-${aRoute.destination}`;
}


export type Route = Readonly<{
    origin: airport.Airport,
    destination: airport.Airport
}>

export const between = (origin: airport.Airport, destination: airport.Airport): Route => {
    if (airport.equals(origin, destination)) {
        throw new Error('Route origin and destination must not be the same');
    }
    return {origin, destination}
}