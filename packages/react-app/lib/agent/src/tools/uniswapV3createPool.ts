import { ToolConfig } from './allTools';
import { createViemWalletClient } from '../viem/createViemWalletClient';

const FACTORY_ADDRESS = '0x2E17FF9b877661bDFEF8879a4B31665157a960F0';
const FACTORY_ABI = [
    {
        inputs: [
            { name: 'tokenA', type: 'address' },
            { name: 'tokenB', type: 'address' },
            { name: 'fee', type: 'uint24' }
        ],
        name: 'createPool',
        outputs: [{ name: 'pool', type: 'address' }],
        stateMutability: 'nonpayable',
        type: 'function'
    }
] as const;

export const uniswapV3CreatePoolTool: ToolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'create_uniswap_v3_pool',
            description: 'Create a new Uniswap V3 liquidity pool between two tokens',
            parameters: {
                type: 'object',
                properties: {
                    tokenA: {
                        type: 'string',
                        description: 'Address of the first token',
                        pattern: '^0x[a-fA-F0-9]{40}$'
                    },
                    tokenB: {
                        type: 'string',
                        description: 'Address of the second token',
                        pattern: '^0x[a-fA-F0-9]{40}$'
                    },
                    fee: {
                        type: 'string',
                        description: 'Fee tier in basis points (e.g., "500" for 0.05%, "3000" for 0.3%, "10000" for 1%)'
                    }
                },
                required: ['tokenA', 'tokenB', 'fee']
            }
        }
    },
    handler: async (args: { tokenA: string, tokenB: string, fee: string }) => {
        const walletClient = createViemWalletClient();

        const hash = await walletClient.writeContract({
            address: FACTORY_ADDRESS,
            abi: FACTORY_ABI,
            functionName: 'createPool',
            args: [args.tokenA as `0x${string}`, args.tokenB as `0x${string}`, Number(args.fee)]
        });

        return hash;
    }
};
