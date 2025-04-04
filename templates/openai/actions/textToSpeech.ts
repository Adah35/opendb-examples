import {Action, Property} from '@opendashboard/integration-core';

interface Input {
    model: string;
    input: string;
    voice: string;
    response_format: string;
}

interface Output {
    audioUrl: any; // Will be fixed once saving logic is added
}

export const textToSpeech: Action<Input, Output> = {
    identifier: 'textToSpeech',
    displayName: 'Text to Speech',
    description: 'Convert text to audio using OpenAI TTS',
    props: {
        model: Property.StaticDropdown({
            displayName: 'Model',
            defaultValue: 'tts-1',
            required: true,
            options: [
                {label: 'tts-1', value: 'tts-1'},
                {label: 'tts-1-hd', value: 'tts-1-hd'},
            ],
        }),
        input: Property.LongText({
            displayName: 'Input Text',
            required: true,
        }),
        voice: Property.StaticDropdown({
            displayName: 'Voice',
            required: true,
            options: [
                {label: 'Alloy', value: 'alloy'},
                {label: 'Echo', value: 'echo'},
                {label: 'Fable', value: 'fable'},
                {label: 'Onyx', value: 'onyx'},
                {label: 'Nova', value: 'nova'},
                {label: 'Shimmer', value: 'shimmer'},
            ],
        }),
        response_format: Property.StaticDropdown({
            displayName: 'Response Format',
            required: true,
            defaultValue: 'mp3',
            options: [
                {label: 'MP3', value: 'mp3'},
                {label: 'AAC', value: 'aac'},
                {label: 'Opus', value: 'opus'},
                {label: 'FLAC', value: 'flac'},
                {label: 'PCM', value: 'pcm'},
                {label: 'WAV', value: 'wav'},
            ],
        }),
    },
    run: async ({propsValue, auth, files}) => {
        const res = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${auth.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: propsValue.model,
                input: propsValue.input,
                voice: propsValue.voice,
                response_format: propsValue.response_format,
            }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`[OpenAI TTS] ${error}`);
        }

        const buffer = await res.arrayBuffer();
        const fileExtension = propsValue.response_format || 'mp3'; // fallback if needed

        const result = await files.write({
            fileName: `audio.${fileExtension}`,
            data: Buffer.from(buffer)
        });

        return {
            audioUrl: result.url,
        };
    },
};
