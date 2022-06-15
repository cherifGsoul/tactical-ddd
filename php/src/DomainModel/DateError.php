<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

use DomainException;

class DateError extends DomainException
{

    public static function dateInThePastError(): DateError
    {
        return new DateError('Flight date can not be in the past');
    }

    public static function returnDateMustBeGreaterThanDepartureDate(): DateError
    {
        return new DateError('Flight return date must be in greater than departure date');
    }

    public static function roundTripReturnDateMustBeSet(): DateError
    {
        return new DateError('Round trip flight return date must be set');
    }
}