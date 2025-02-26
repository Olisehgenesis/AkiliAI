import { getBalanceTool } from './getBalance';
import { getWalletAddressTool } from './getWalletAddress';
import { readContractTool } from './readContract';
import { sendTransactionTool } from './sendTransaction';
import { writeContractTool } from './writeContract';
import { getContractAbiTool } from './getContractAbi';
import { getTransactionReceiptTool } from './getTransactionReceipt';
import { deployErc20Tool } from './deployErc20';
import { uniswapV3CreatePoolTool } from './uniswapV3createPool';
import { approveTokenAllowanceTool } from './approveTokenAllowance';
import { getTokenBalanceTool } from './getTokenBalance';

export interface ToolConfig<T = any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
    // == READ == \\
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,
    
    get_contract_abi: getContractAbiTool,
    read_contract: readContractTool,
    get_transaction_receipt: getTransactionReceiptTool,
    get_token_balance: getTokenBalanceTool,
    // get_contract_bytecode: getContractBytecodeTool,

    // == WRITE == \\
    send_transaction: sendTransactionTool,
    write_contract: writeContractTool,
    deploy_erc20: deployErc20Tool,
    create_uniswap_v3_pool: uniswapV3CreatePoolTool,
    approve_token_allowance: approveTokenAllowanceTool,

    // Add more tools here...
};
