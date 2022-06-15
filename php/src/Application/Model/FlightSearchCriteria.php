<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\Application\Model;

use Cherif\FlightSearch\DomainModel\Flight;
use DateTimeImmutable;

class FlightSearchCriteria
{
    private string $origin;
    private string $destination;
    private DateTimeImmutable $departingDate;
    private string $type;
    private string $flightClass;
    private int $adults;
    private int $children;
    private int $infant;
    private ?DateTimeImmutable $returningDate;

    private function __construct()
    {
    }


    public static function fromDomain(Flight $flight): FlightSearchCriteria
    {
        $instance = new FlightSearchCriteria();
        $instance->origin = $flight->getRoute()->getOrigin()->toString();
        $instance->destination = $flight->getRoute()->getDestination()->toString();
        $instance->departingDate = $flight->getTypePeriod()->getDepartingDate()->toNative();
        $instance->returningDate = !$flight->getTypePeriod()->getReturningDate() ? null : $flight->getTypePeriod()->getReturningDate()->toNative();
        $instance->type = $flight->getTypePeriod()->getType()->getValue();
        $instance->flightClass = $flight->getCabinClass()->getValue();
        $instance->adults = $flight->getPassengers()->getAdults();
        $instance->children = $flight->getPassengers()->getChildren();
        $instance->infant = $flight->getPassengers()->getInfant();
        return $instance;
    }

    /**
     * @return string
     */
    public function getOrigin(): string
    {
        return $this->origin;
    }

    /**
     * @return string
     */
    public function getDestination(): string
    {
        return $this->destination;
    }

    /**
     * @return DateTimeImmutable
     */
    public function getDepartingDate(): DateTimeImmutable
    {
        return $this->departingDate;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return string
     */
    public function getFlightClass(): string
    {
        return $this->flightClass;
    }

    /**
     * @return int
     */
    public function getAdults(): int
    {
        return $this->adults;
    }

    /**
     * @return int
     */
    public function getChildren(): int
    {
        return $this->children;
    }

    /**
     * @return int
     */
    public function getInfant(): int
    {
        return $this->infant;
    }

    /**
     * @return DateTimeImmutable|null
     */
    public function getReturningDate(): ?DateTimeImmutable
    {
        return $this->returningDate;
    }


}