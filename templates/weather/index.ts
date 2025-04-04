import {createIntegration} from '@opendashboard/integration-core';
import {getCurrentWeather} from "./triggers/dailyWeather";
import {dailyWeather} from "./triggers/dailyWeather";

console.log('Framework is working:', createIntegration);


export default createIntegration({
    name: 'WeatherAPI',
    identifier: 'weatherapi',
    icon: 'https://cdn-icons-png.flaticon.com/512/1116/1116453.png',
    description: 'Get current weather data for any location.',
    author: 'Opendashboard',
    actions: {
        getCurrentWeather,
    },

    triggers: {
        dailyWeather,
    },
});
