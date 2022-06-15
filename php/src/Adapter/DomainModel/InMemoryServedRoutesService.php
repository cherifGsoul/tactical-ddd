<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\Adapter\DomainModel;

use Cherif\FlightSearch\DomainModel\Airport;
use Cherif\FlightSearch\DomainModel\Route;
use Cherif\FlightSearch\DomainModel\ServedRoutesService;

class InMemoryServedRoutesService implements ServedRoutesService
{
    private array $servedRoutes = [];

    public function isServedRoute(Route $route): bool
    {
        return in_array($route, $this->servedRoutes);
    }

    public function between(string $origin, string $destination)
    {
        $this->servedRoutes[] = Route::between(Airport::fromString($origin), Airport::fromString($destination));
    }
}