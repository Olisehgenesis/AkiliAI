import { Address, parseEther } from 'viem';
import { createViemWalletClient } from '../viem/createViemWalletClient';
import { ToolConfig } from './allTools';

interface SendTransactionArgs {
    to: Address;
    value?: string;
    gasPrice?: string;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction',
            description: 'Send a transaction with optional gas parameters',
            parameters: {
                type: 'object',
                properties: {
                    to: { type: 'string', pattern: '^0x[a-fA-F0-9]{40}$', description: 'Recipient address' },
                    value: { type: 'string', description: 'Amount to send (ETH)' },
                    gasPrice: { type: 'string', description: 'Gas price in Gwei' }
                },
                required: ['to']
            }
        }
    },
    handler: async (args) => {
        const result = await sendTransaction(args);
        if (!result.success || !result.hash) throw new Error(result.message);
        return result.hash;
    }
};

async function sendTransaction({ to, value, gasPrice }: SendTransactionArgs) {
    try {
        const walletClient = createViemWalletClient();

        if (!walletClient.account) {
            throw new Error('Wallet account not connected');
        }
        let [address] = await walletClient.getAddresses();

        const hash = await walletClient.sendTransaction({
            account: address,
            to,
            value: value ? parseEther(value) : undefined,
            gasPrice: gasPrice ? parseEther(gasPrice) : undefined
        });
        return { success: true, hash, message: `Transaction sent. Hash: ${hash}` };
    } catch (error) {
        return { success: false, hash: null, message: `Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
}
