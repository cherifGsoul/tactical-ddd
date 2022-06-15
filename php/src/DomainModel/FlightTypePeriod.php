<?php
declare(strict_types=1);

namespace Cherif\FlightSearch\DomainModel;

final class FlightTypePeriod
{
    private FlightType $type;
    private FlightDate $departingDate;
    private ?FlightDate $returningDate;

    /**
     * @param FlightType $type
     * @param FlightDate $departingDate
     */
    private function __construct(FlightType $type, FlightDate $departingDate)
    {
        $this->type = $type;
        $this->departingDate = $departingDate;
        $this->returningDate = null;
    }

    public static function forTypeInPeriod(FlightType $type, FlightDate $departingDate, ?FlightDate $returningDate = null): FlightTypePeriod
    {
        $instance = new FlightTypePeriod($type, $departingDate);
        $instance->setReturningDate($returningDate);
        return $instance;
    }

    private function setReturningDate(?FlightDate $returningDate = null): void
    {
        if ($this->type->equals(FlightType::ROUND_TRIP())) {
            if (is_null($returningDate)) {
                throw DateError::roundTripReturnDateMustBeSet();
            }

            if ($this->departingDate->equals($returningDate) || $this->departingDate->greaterThan($returningDate)) {
                throw DateError::returnDateMustBeGreaterThanDepartureDate();
            }
        }
        $this->returningDate = $returningDate;
    }

    /**
     * @return FlightType
     */
    public function getType(): FlightType
    {
        return $this->type;
    }

    /**
     * @return FlightDate
     */
    public function getDepartingDate(): FlightDate
    {
        return $this->departingDate;
    }

    /**
     * @return FlightDate|null
     */
    public function getReturningDate(): ?FlightDate
    {
        return $this->returningDate;
    }


}