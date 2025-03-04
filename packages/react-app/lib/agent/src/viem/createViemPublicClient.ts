import { createPublicClient, http } from 'viem'
import { celo } from 'viem/chains'

export function createViemPublicClient() {
    return createPublicClient({
        chain: celo,
        transport: http(),
    });
}
