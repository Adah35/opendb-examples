import { IntegrationDefinition } from '@opendashboard/integration-core';
import { textCompletion } from './actions/textComplete';
import { textToSpeech } from './actions/textToSpeech';
import { generateImage } from './actions/generateImage';
import { OpenAIAuth } from './shared';

const MyApp: IntegrationDefinition = {
    identifier: 'openAI-project',
    name: 'openAI-project',
    description: 'Connect to openAI-project integration for completions, image generation, and audio.',
    auth: OpenAIAuth,
    actions: {
        textCompletion,
        textToSpeech,
        generateImage,
    },
    triggers: {},
};

export default MyApp;
