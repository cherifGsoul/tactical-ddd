<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\Application;

use Cherif\FlightSearch\Application\Command\FlightSearchCriteriaCommand;
use Cherif\FlightSearch\Application\Exception\DateError;
use Cherif\FlightSearch\Application\Exception\PassengerSeatsError;
use Cherif\FlightSearch\DomainModel\PassengerSeatsError as DomainPassengerSeatsError;
use Cherif\FlightSearch\Application\Exception\RouteError;
use Cherif\FlightSearch\Application\Model\FlightSearchCriteria;
use Cherif\FlightSearch\DomainModel\DateError as DomainDateError;
use Cherif\FlightSearch\DomainModel\Flight;
use Cherif\FlightSearch\DomainModel\ServedRoutesService;
use Throwable;

class FlightSearchService
{
    private ServedRoutesService $servedRoutesService;

    /**
     * @param ServedRoutesService $servedRoutesService
     */
    public function __construct(ServedRoutesService $servedRoutesService)
    {
        $this->servedRoutesService = $servedRoutesService;
    }

    public function match(FlightSearchCriteriaCommand $command)
    {
        // Route checking
        $route = $command->getRoute();
        if (!$this->servedRoutesService->isServedRoute($route)) {
            throw RouteError::routeIsNotServedError($route);
        }

        try {
            $flight = Flight::for(
                $route,
                $command->getFlightTypePeriod(),
                $command->getPassengers(),
                $command->getCabinClass()
            );
            return FlightSearchCriteria::fromDomain($flight);
        } catch (Throwable $e) {
            if ($e instanceof DomainDateError) {
                throw new DateError($e->getMessage());
            }

            if ($e instanceof DomainPassengerSeatsError) {
                throw new PassengerSeatsError($e->getMessage());
            }

            throw new \Exception($e->getMessage());
        }
    }
}