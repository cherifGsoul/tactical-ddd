<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

final class Route
{
    private Airport $origin;
    private Airport $destination;

    /**
     * @param Airport $origin
     * @param Airport $destination
     */
    private function __construct(Airport $origin, Airport $destination)
    {
        $this->origin = $origin;
        $this->destination = $destination;
    }

    public static function between(Airport $origin, Airport $destination): Route
    {
        return new Route($origin, $destination);
    }

    public function toString(): string
    {
        return $this->origin->toString() . ' to ' . $this->destination->toString();
    }

    public function getOrigin(): Airport
    {
        return $this->origin;
    }

    public function getDestination(): Airport
    {
        return $this->destination;
    }
}