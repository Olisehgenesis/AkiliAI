import { createWalletClient, custom } from "viem";
import { celo } from "viem/chains";


export function createViemWalletClient() {

    const client = createWalletClient({
        chain: celo,
        transport: custom(window.ethereum!)
      });
    return client;
    }