"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MonitorSmartphone, Chrome } from "lucide-react";
import { createPublicClient, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { ChatLayout } from '@/components/chatLayout';
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
 
const client = createWalletClient({
  chain: celoAlfajores,
  transport: custom(window.ethereum!)
})

// Create public client for blockchain interaction (Celo network in this case)
const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(),
});

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [showInstallTooltip, setShowInstallTooltip] = useState(false);

  // Fetch address using publicClient from viem
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addresses = await client.getAddresses();
        const account = addresses[0];
        setAddress(account); // Set the address once fetched
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AkiliAI</h1>
          <p className="text-xl text-gray-600">Your Personalised Onchain AI Helper</p>
        </header>

        {address ? (
          <ChatLayout isVoiceInput={isVoiceInput} toggleVoiceInput={() => setIsVoiceInput(!isVoiceInput)} />
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Get Started with AkiliAI AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
                  onClick={() => console.log("Installing desktop app...")}
                  onMouseEnter={() => setShowInstallTooltip(true)}
                  onMouseLeave={() => setShowInstallTooltip(false)}
                  title="Install on Desktop"
                >
                  <MonitorSmartphone className="w-5 h-5" />
                </Button>
                <Button
                  className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
                  onClick={() => console.log("Installing browser extension...")}
                  title="Install Extension"
                >
                  <Chrome className="w-5 h-5" />
                </Button>
                {showInstallTooltip && (
                  <div className="absolute top-full mt-2 p-2 bg-black text-white text-sm rounded shadow-lg">
                    MiniPay is the runtime environment required for AkiliAI
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
