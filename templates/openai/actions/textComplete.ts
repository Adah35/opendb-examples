import { Action, Property } from '@opendashboard/integration-core';
import { modelProp } from '../shared';

interface Input {
    model: string;
    prompt: string;
}
interface Output {
    response: string;
}

export const textCompletion: Action<Input, Output> = {
    identifier: 'textCompletion',
    displayName: 'Text Completion',
    description: 'Generate a chat completion from OpenAI',
    props: {
        model: modelProp,
        prompt: Property.LongText({
            displayName: 'Prompt',
            required: true,
        }),
    },
    run: async ({ propsValue, auth }) => {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: propsValue.model,
                messages: [{ role: 'user', content: propsValue.prompt }],
            }),
        });

        const data = await res.json();

        return {
            response: data.choices?.[0]?.message?.content || '',
        };
    },
};
