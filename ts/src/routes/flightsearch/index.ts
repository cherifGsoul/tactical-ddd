import {FastifyInstance, FastifyPluginAsync, FastifyRequest} from "fastify"
import {SearchFlight} from "../../flight-search/application/types";
import {FlightSearchCriteriaDTO} from "../../flight-search/application/dto";
import {schema} from "./schema";

const search: FastifyPluginAsync = async (fastify: FastifyInstance, opts): Promise<void> => {
    fastify.post('/',{schema}, async function (request: FastifyRequest<{Body: FlightSearchCriteriaDTO}>, reply) {
        const dto: FlightSearchCriteriaDTO = request.body;
        return await fastify.searchFlight(FlightSearchCriteriaDTO.toInvalidFlightSearchCriteria(dto));
    })
}

declare module 'fastify' {
    export interface FastifyInstance {
        searchFlight: SearchFlight;
    }
}

export default search;
