<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

use MyCLabs\Enum\Enum;

/**
 * @method static ONE_WAY()
 * @method static ROUND_TRIP()
 */
final class FlightType extends Enum
{
    private const ONE_WAY = 'one-way';
    private const ROUND_TRIP = 'ROUND-TRIP';
}