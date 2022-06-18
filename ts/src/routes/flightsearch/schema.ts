export const schema = {
    body: {
        type: 'object',
        required: ['route'],
        properties: {
            route: {
                type: 'object',
                properties: {
                    origin: {type: 'string'},
                    destination: {type: 'string'}
                }
            },
            flightTypePeriod: {
                type: 'object',
                required: ['flightType', 'departingDate'],
                properties: {
                    flightType: {enum: ["one-way", "round-trip"]},
                    departingDate: {type: 'string'},
                    returningDate: {type: 'string'},
                }
            },
            passengers: {
                type: 'object',
                properties: {
                    adults: {type: 'integer'},
                    children: {type: 'integer'},
                    infant: {type: 'integer'}
                }
            },
            cabinClass: {type: 'string'}
        }
    }
}