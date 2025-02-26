async function createThread(client: OpenAI, message: string) {
    const thread = await client.beta.threads.create();
    await client.beta.threads.messages.create({
        threadId: thread.id,
        body: { role: "user", content: message }
    });
    return thread;
}