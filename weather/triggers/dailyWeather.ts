import {Property, type Trigger} from '@opendashboard/integration-core';

interface Output {
    city: string;
    temperature: string;
    condition: string;
    timestamp: string;
}

interface Input {
    city: string;
}

export const dailyWeather: Trigger<Input, Output> = {
    identifier: 'dailyWeather',
    displayName: 'Daily Weather',
    description: 'Polls current weather for a city',
    type: 'POLLING',
    props: {
        city: Property.ShortText({
            displayName: 'City',
            required: true,
        }),
    },
    sampleData: {
        city: 'Lagos',
        temperature: '30°C',
        condition: 'Cloudy',
        timestamp: new Date().toISOString(),
    },
    run: async (ctx) => {
        const city = ctx.propsValue.city;

        const url = `http://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log('Test Data:', {data});

        return [
            {
                city: data.location.name,
                temperature: `${data.current.temp_c}°C`,
                condition: data.current.condition.text,
                timestamp: data.location.localtime,
            },
        ];
    },
    test: async (ctx) => {
        const city = ctx.propsValue.city || 'Lagos';

        const url = `http://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log('Test Data:', {data});

        return [
            {
                city: data.location.name,
                temperature: `${data.current.temp_c}°C`,
                condition: data.current.condition.text,
                timestamp: data.location.localtime,
            },
        ];
    },
};
