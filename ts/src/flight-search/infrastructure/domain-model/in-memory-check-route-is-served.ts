import {CheckRouteIsServed, route, airport} from "../../domain-model";

const routes: Map<string, route.Route> = new Map()

const routed = route.between(airport.fromCode('ALG'), airport.fromCode('AEE'))

routes.set(route.toString(routed), routed)

export const inMemoryCheckRouteIsServed: CheckRouteIsServed = async (aRoute: route.Route): Promise<boolean> => {
    return routes.has(route.toString(aRoute))
}