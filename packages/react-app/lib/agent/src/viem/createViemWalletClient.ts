import { createWalletClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";


export function createViemWalletClient() {

    const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum!)
      });
    return client;
}