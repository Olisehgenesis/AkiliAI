import { OpenAI } from "openai";
import { formatEther } from "ethers"; // Assuming you're using ethers for formatting
import { http, PublicClient , createPublicClient} from "viem"; 
import { celoAlfajores } from "viem/chains";




const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http()
});

async function createAssistant(client: OpenAI) {
    return await client.beta.assistants.create({
        model: "gpt-3.5-turbo",
        instructions: "You are an AI assistant capable of performing onchain actions.",
        tools: [{
            type: "function",
            function: {
                name: "getBalance",
                description: "Get the balance of a wallet",
                parameters: {
                    type: "object",
                    properties: {
                        wallet: {
                            type: "string",
                            description: "The wallet address"
                        }
                    },
                    required: ["wallet"]
                }
            }
        }]
    });
}

async function createThread(client: OpenAI, message: string) {
    const thread = await client.beta.threads.create();
    await client.beta.threads.messages.create(thread.id, {
        role: "user",
        content: message
    });
    return thread;
}

async function createRun(client: OpenAI, threadId: string, assistantId: string) {
    const run = await client.beta.threads.runs.create(threadId, {
        assistant_id: assistantId
    });
    
    // Implement polling logic to check run status
    let runStatus = await client.beta.threads.runs.retrieve(threadId, run.id);
    
    while (runStatus.status !== "completed") {
        // Wait for a short time before polling again
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check the status again
        runStatus = await client.beta.threads.runs.retrieve(threadId, run.id);
        
        // Handle different statuses
        if (runStatus.status === "requires_action") {
            await handleRunToolCalls(runStatus, client, threadId);
        } else if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
            throw new Error(`Run failed with status: ${runStatus.status}`);
        }
    }
    
    // Return the completed run
    return runStatus;
}

async function handleRunToolCalls(run: any, client: OpenAI, threadId: string) {
    const toolCalls = run.required_action.submit_tool_outputs.tool_calls;
    const toolOutputs = [];
    
    for (const toolCall of toolCalls) {
        // Extract function name and arguments
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        // Find corresponding handler
        const handler = toolHandlers[functionName];
        if (!handler) {
            throw new Error(`Unknown tool: ${functionName}`);
        }
        
        // Execute the handler
        try {
            const output = await handler(functionArgs);
            toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify(output)
            });
        } catch (error) {
            toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify({ error: error.message })
            });
        }
    }
    
    // Submit tool outputs back to the API
    await client.beta.threads.runs.submitToolOutputs(
        threadId,
        run.id,
        { tool_outputs: toolOutputs }
    );
}

// Define handlers separately from assistant tool definitions
const toolHandlers = {
    getBalance: async (args: { wallet: string }) => {
        const balance = await publicClient.getBalance({ address: args.wallet });
        return formatEther(balance);
    }
};

// Example usage
async function main() {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    const assistant = await createAssistant(client);
    const thread = await createThread(client, "What's the balance of 0x742d35Cc6634C0532925a3b844Bc454e4438f44e?");
    const run = await createRun(client, thread.id, assistant.id);
    
    // Get messages after run completes
    const messages = await client.beta.threads.messages.list(thread.id);
    console.log(messages.data[0].content);
}

// Run the main function
main().catch(console.error);