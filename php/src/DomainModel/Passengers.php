<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

final class Passengers
{
    private int $adults = 0;
    private int $children = 0;
    private int $infant = 0;

    /**
     * @param int $adults
     * @param int $children
     * @param int $infant
     */
    private function __construct()
    {
    }

    public static function from(int $adults, int $children, int $infant): Passengers
    {
        $passengers = new Passengers();
        $passengers->setAdults($adults);
        $passengers->setChildren($children);
        $passengers->setInfant($infant);
        return $passengers;
    }

    /**
     * @param int $adults
     */
    private function setAdults(int $adults): void
    {
        $seats = $this->children + $adults;

        if ($seats > 9) {
            throw PassengerSeatsError::numberOfAllowedSeatsExceeded();
        }

        if ($adults === 0) {
            throw PassengerSeatsError::zeroAdultSeatError();
        }

        if ($adults > 9) {
            throw PassengerSeatsError::adultSeatsGreaterThanNineError();
        }

        $this->adults = $adults;
    }

    private function setChildren(int $children): void
    {
        $seats = $this->adults + $children;
        if ($seats > 9) {
            throw PassengerSeatsError::numberOfAllowedSeatsExceeded();
        }
        $this->children = $children;
    }

    private function setInfant(int $infant)
    {
        if ($infant > $this->adults) {
            throw PassengerSeatsError::numberOfInfantSeatsExceeded();
        }
        $this->infant = $infant;
    }

    public function getAdults(): int
    {
        return $this->adults;
    }

    public function getChildren(): int
    {
        return $this->children;
    }

    public function getInfant(): int
    {
        return $this->infant;
    }
}