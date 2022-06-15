<?php

namespace Cherif\FlightSearch\DomainModel;

use MyCLabs\Enum\Enum;

final class CabinClass extends Enum
{
    private const ECONOMIC = 'economic';
    private const BUSINESS = 'business';
    private const FIRST = 'first';

}