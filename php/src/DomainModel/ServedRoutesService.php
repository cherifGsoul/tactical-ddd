<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

interface ServedRoutesService
{
    public function isServedRoute(Route $route): bool;
}