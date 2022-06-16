export enum FlightTypeEnum {
    ONE_WAY = 'one-way',
    ROUND_TRIP = 'round-trip'
}
export type FlightType = typeof FlightTypeEnum[keyof typeof FlightTypeEnum];

export const from = (type: string): FlightType => {
   switch (type) {
       case 'one-way': return FlightTypeEnum.ONE_WAY
       case 'round-trip': return FlightTypeEnum.ROUND_TRIP
       default: throw new TypeError('Invalid flight type')
   }
}

export const equals = (type: FlightType, other: FlightType): boolean => {
    return type === other
}