import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { searchFlight } from "./flight-search/application";
import {
  inMemoryCheckRouteIsServed
} from "./flight-search/infrastructure/domain-model/in-memory-check-route-is-served";
import {fakeEncryptFlightSearchCriteria} from "./flight-search/infrastructure/domain-model";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!
  fastify.decorate('searchFlight', searchFlight(inMemoryCheckRouteIsServed, fakeEncryptFlightSearchCriteria))
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app }
