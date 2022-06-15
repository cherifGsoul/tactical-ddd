<?php

namespace Cherif\FlightSearch\DomainModel;

use DateTimeImmutable;

final class FlightDate
{
    private DateTimeImmutable $date;

    /**
     * @param DateTimeImmutable $date
     */
    private function __construct(DateTimeImmutable $date)
    {
        $today = new DateTimeImmutable('midnight', new \DateTimeZone('Africa/Algiers'));
        if ($date < $today) {
            throw DateError::dateInThePastError();
        }
        $this->date = $date;
    }

    public static function fromNative(DateTimeImmutable $date): FlightDate
    {
        return new FlightDate($date);
    }

    public function toNative(): DateTimeImmutable
    {
        return $this->date;
    }

    public function equals(FlightDate $other): bool
    {
        return $this->date === $other->date;
    }

    public function greaterThan(FlightDate $other): bool
    {
        return $this->date > $other->date;
    }

}