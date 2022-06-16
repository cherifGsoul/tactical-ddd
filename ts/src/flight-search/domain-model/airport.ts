export type Airport = Readonly<string>;

const airportValidationPattern = /^[A-Z]{3}$/

export const fromCode = (code: string) => {
    const valid = airportValidationPattern.test(code)
    if (!valid) {
        throw new TypeError('Airport code is not valid');
    }
    return code as Airport;
}