import { formatEther } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient';
import { createViemWalletClient } from '../viem/createViemWalletClient';

async function getMyBalance() {
  // Get wallet client
  const walletClient = createViemWalletClient();
  
  // Get your address from the wallet client
  const [myAddress] = await walletClient.getAddresses();
  
  // Use the getBalance function to fetch the balance
  const publicClient = createViemPublicClient();
  const balance = await publicClient.getBalance({ address: myAddress });
  console.log(formatEther(balance));
  
  return formatEther(balance);

}

