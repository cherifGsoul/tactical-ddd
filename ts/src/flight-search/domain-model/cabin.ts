export enum CabinEnum {
    ECONOMIC = 'economic',
    BUSINESS = 'business',
    FIRST = 'first'
}
export type Cabin = typeof CabinEnum[keyof typeof CabinEnum];

export const from = (type: string): Cabin => {
    switch (type) {
        case 'economic': return CabinEnum.ECONOMIC
        case 'business': return CabinEnum.BUSINESS
        case 'FIRST': return CabinEnum.FIRST
        default: throw new TypeError('Invalid cabin class')
    }
}
