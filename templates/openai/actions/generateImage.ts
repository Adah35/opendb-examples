import { Action, Property } from '@opendashboard/integration-core';

interface Input {
    prompt: string;
    size: string;
}
interface Output {
    imageUrl: string;
}

export const generateImage: Action<Input, Output> = {
    identifier: 'generateImage',
    displayName: 'Generate Image',
    description: 'Generate an image from a text prompt using DALL·E',
    props: {
        prompt: Property.LongText({
            displayName: 'Prompt',
            required: true,
        }),
        size: Property.StaticDropdown({
            displayName: 'Size',
            required: true,
            options: [
                { label: '256x256', value: '256x256' },
                { label: '512x512', value: '512x512' },
                { label: '1024x1024', value: '1024x1024' },
            ],
        }),
    },
    run: async ({ propsValue, auth }) => {
        const res = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${auth.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: propsValue.prompt,
                n: 1,
                size: propsValue.size,
                response_format: 'url',
            }),
        });

        const data = await res.json();

        return {
            imageUrl: data.data?.[0]?.url || '',
        };
    },
};
