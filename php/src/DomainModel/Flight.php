<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

final class Flight
{
    private Route $route;
    private FlightTypePeriod $typePeriod;
    private Passengers $passengers;
    private CabinClass $cabinClass;

    /**
     * @param Route $route
     * @param FlightDate $date
     */
    private function __construct()
    {
    }


    public static function for(Route $route,
                               FlightTypePeriod $typePeriod,
                               Passengers $passengers,
                               CabinClass $cabinClass): Flight
    {
        $flight = new Flight();
        $flight->typePeriod = $typePeriod;
        $flight->route = $route;
        $flight->passengers = $passengers;
        $flight->cabinClass = $cabinClass;
        return $flight;
    }

    /**
     * @return FlightTypePeriod
     */
    public function getTypePeriod(): FlightTypePeriod
    {
        return $this->typePeriod;
    }

    /**
     * @return Route
     */
    public function getRoute(): Route
    {
        return $this->route;
    }

    /**
     * @return Passengers
     */
    public function getPassengers(): Passengers
    {
        return $this->passengers;
    }

    /**
     * @return CabinClass
     */
    public function getCabinClass(): CabinClass
    {
        return $this->cabinClass;
    }

}