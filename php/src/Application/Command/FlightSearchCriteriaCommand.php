<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\Application\Command;

use Cherif\FlightSearch\DomainModel\Airport;
use Cherif\FlightSearch\DomainModel\CabinClass;
use Cherif\FlightSearch\DomainModel\FlightDate;
use Cherif\FlightSearch\DomainModel\FlightType;
use Cherif\FlightSearch\DomainModel\FlightTypePeriod;
use Cherif\FlightSearch\DomainModel\Passengers;
use Cherif\FlightSearch\DomainModel\Route;
use DateTimeImmutable;

final class FlightSearchCriteriaCommand
{
    private string $origin;
    private string $destination;
    private DateTimeImmutable $departingDate;
    private ?DateTimeImmutable $returningDate;
    private string $flightType;
    private string $cabinClass;
    private int $adults  = 0;
    private int $children = 0;
    private int $infant = 0;

    public static function from(string            $origin,
                                string            $destination,
                                DateTimeImmutable $departingDate,
                                string            $flightClass,
                                string            $flightType,
                                DateTimeImmutable $returningDate = null
    ): FlightSearchCriteriaCommand
    {
        $instance = new FlightSearchCriteriaCommand();
        $instance->origin = $origin;
        $instance->destination = $destination;
        $instance->departingDate = $departingDate;
        $instance->returningDate = $returningDate;
        $instance->cabinClass = $flightClass;
        $instance->flightType = $flightType;
        return $instance;
    }

    /**
     * @return Airport
     */
    public function getOrigin(): Airport
    {
        return Airport::fromString($this->origin);
    }

    /**
     * @return string
     */
    public function getDestination(): Airport
    {
        return Airport::fromString($this->destination);
    }


    /**
     * @return FlightDate
     */
    public function getDepartingDate(): FlightDate
    {
        return FlightDate::fromNative($this->departingDate);
    }

    /**
     * @return FlightType
     */
    public function getFlightType(): FlightType
    {
        return FlightType::from($this->flightType);
    }

    public function getPassengers(): Passengers
    {
        return Passengers::from($this->adults, $this->children, $this->infant);
    }

    public function getRoute(): Route
    {
        return Route::between(
            $this->getOrigin(),
            $this->getDestination()
        );
    }

    public function withAdults(int $adults): FlightSearchCriteriaCommand
    {
        $command = clone $this;
        $command->adults = $adults;
        return $command;
    }

    public function withChildren(int $children): FlightSearchCriteriaCommand
    {
        $command = clone $this;
        $command->children = $children;
        return $command;
    }

    /**
     * @return CabinClass
     */
    public function getCabinClass(): CabinClass
    {
        return CabinClass::from($this->cabinClass);
    }

    /**
     * @return FlightDate|null
     */
    public function getReturningDate(): ?FlightDate
    {
        if (is_null($this->returningDate)) return null;
        return FlightDate::fromNative($this->returningDate);
    }

    public function withInfant(int $infant): FlightSearchCriteriaCommand
    {
        $command = clone $this;
        $command->infant = $infant;
        return $command;
    }

    public function getFlightTypePeriod(): FlightTypePeriod
    {
        return FlightTypePeriod::forTypeInPeriod(
            $this->getFlightType(),
            $this->getDepartingDate(),
            $this->getReturningDate()
        );
    }
}