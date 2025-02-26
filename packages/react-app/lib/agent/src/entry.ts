// src/utils/entry.ts

import 'dotenv/config';
import OpenAI from "openai";
import { createAssistant } from './openai/createAssistant';
import { createThread } from './openai/createThread';
import { createRun } from './openai/createRun';
import { performRun } from './openai/performRun';
import { Thread } from 'openai/resources/beta/threads/threads';
import { Assistant } from 'openai/resources/beta/assistants';

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true
});
let assistant: Assistant;
let thread: Thread;

async function initialize() {
    assistant = await createAssistant(client);
    thread = await createThread(client);
}

// Call initialize to set up assistant and thread
initialize();

export async function receiveMessage(message: string) {
    if (!assistant || !thread) {
        console.error("Assistant or thread not initialized.");
        return;
    }

    try {
        // Add the user's message to the thread
        await client.beta.threads.messages.create(thread.id, {
            role: "user",
            content: message
        });

        // Create and perform the run
        const run = await createRun(client, thread, assistant.id);
        const result = await performRun(run, client, thread);

        if (result?.type === 'text') {
            return result.text.value; // Return assistant's response
        }
    } catch (error) {
        console.error("Error in receiveMessage:", error);
    }
}
