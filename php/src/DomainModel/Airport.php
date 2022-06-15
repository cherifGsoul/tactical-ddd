<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

final class Airport
{
    /**
     * @var string
     */
    private string $code;

    /**
     * @param string $code
     */
    private function __construct(string $code)
    {
        $this->code = $code;
    }

    public static function fromString(string $code): Airport
    {
        if (!preg_match('/^[A-Z]{3}$/', $code)) {
            throw new \InvalidArgumentException('Airport code is not valid');
        }
        return new Airport($code);
    }

    public function toString(): string
    {
        return $this->code;
    }
}