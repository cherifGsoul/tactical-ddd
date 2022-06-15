<?php

namespace Cherif\FlightSearch\DomainModel;

use DomainException;

class PassengerSeatsError extends DomainException
{

    public static function zeroAdultSeatError(): PassengerSeatsError
    {
        return new PassengerSeatsError('A flight should have at least one adult passenger');
    }

    public static function adultSeatsGreaterThanNineError(): PassengerSeatsError
    {
        return new PassengerSeatsError('A flight should have 9 adult seats at maximum');
    }

    public static function numberOfAllowedSeatsExceeded(): PassengerSeatsError
    {
        return new PassengerSeatsError('A flight should have 9 seats at maximum');
    }

    public static function numberOfInfantSeatsExceeded(): PassengerSeatsError
    {
        return new PassengerSeatsError('The number of infant seats must be the same as adult seats');
    }
}