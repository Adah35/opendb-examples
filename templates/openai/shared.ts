import { Property, ServiceAuth } from '@opendashboard/integration-core';

export const OpenAIAuth: ServiceAuth = {
    type: 'apiKey',
    fields: {
        apiKey: {
            label: 'API Key',
            type: 'password',
            description: 'Your OpenAI secret key, starting with "sk-"',
        },
    },
    verify: async (credentials) => {
        try {
            const res = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    Authorization: `Bearer ${credentials.apiKey}`,
                },
            });
            return res.ok;
        } catch {
            return false;
        }
    },
};