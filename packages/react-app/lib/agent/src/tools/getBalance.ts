import { Address } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient';
import { ToolConfig } from './allTools';
import { formatEther } from 'viem';

interface GetBalanceArgs {
    wallet: Address;
}

export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_balance',
            description: 'Get the balance of a wallet',
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The wallet address to get the balance of',
                    }
                },
                required: ['wallet']
            }
        }
    },
    handler: async ({ wallet }) => {
        return await getBalance(wallet);
    }
};

async function getBalance(wallet: Address) {
    const publicClient = createViemPublicClient();
    const balance = await publicClient.getBalance({ address: wallet });
    //log the balance
    console.log("Balance: " , balance);
    console.log(formatEther(balance));
    return formatEther(balance);
}