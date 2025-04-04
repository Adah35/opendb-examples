// actions/getCurrentWeather.ts
import {type Action, Property} from '@opendashboard/integration-core';

interface Input {
    city: string;
}

interface Output {
    city: string;
    temperature: string;
    condition: string;
}

export const getCurrentWeather: Action<Input, Output> = {
    identifier: 'getCurrentWeather',
    displayName: 'Get Weather',
    description: 'Fetch current weather by city name',
    props: {
        city: Property.ShortText({
            displayName: 'City',
            required: true,
        }),
    },
    run: async (ctx) => {
        const propsValue = ctx.propsValue
        const city = propsValue.city;
        return {
            city,
            temperature: '22°C',
            condition: 'Sunny',
        };
    },
};
