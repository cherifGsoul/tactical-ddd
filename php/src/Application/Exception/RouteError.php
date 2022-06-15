<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\Application\Exception;

use Cherif\FlightSearch\DomainModel\Route;
use Exception;

class RouteError extends Exception
{

    public static function routeIsNotServedError(Route $route): RouteError
    {
        return new RouteError(sprintf('%s is a served route!', $route->toString()));
    }
}