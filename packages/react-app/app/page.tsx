"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MonitorSmartphone, Chrome } from "lucide-react";
import Image from "next/image";
import { useWeb3 } from '@/contexts/useWeb3';
import { ChatLayout } from '@/components/chatLayout'; // Import the chatLayout component

export default function Home() {
  const {
    address,
    getUserAddress,
    sendCUSD,
    mintMinipayNFT,
    getNFTs,
    signTransaction,
  } = useWeb3();

  // All states in one place
  const [state, setState] = useState({
    cUSDLoading: false,
    nftLoading: false,
    signingLoading: false,
    userOwnedNFTs: [],
    tx: undefined,
    amountToSend: "0.1",
    messageSigned: false,
    showInstallTooltip: false
  });

  // Helper function to update state
  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (address) {
        const tokenURIs = await getNFTs();
        updateState({ userOwnedNFTs: tokenURIs });
      }
    };
    getData();
  }, [address, getNFTs]);

  // Transaction functions
  async function handleSendCUSD() {
    if (!address) return;
    updateState({ signingLoading: true });
    try {
      const tx = await sendCUSD(address, state.amountToSend);
      updateState({ tx });
    } catch (error) {
      console.error('Error sending cUSD:', error);
    } finally {
      updateState({ signingLoading: false });
    }
  }

  async function handleSignMessage() {
    updateState({ cUSDLoading: true });
    try {
      await signTransaction();
      updateState({ messageSigned: true });
    } catch (error) {
      console.error('Error signing message:', error);
    } finally {
      updateState({ cUSDLoading: false });
    }
  }

  async function handleMintNFT() {
    updateState({ nftLoading: true });
    try {
      const tx = await mintMinipayNFT();
      const tokenURIs = await getNFTs();
      updateState({ tx, userOwnedNFTs: tokenURIs });
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      updateState({ nftLoading: false });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AkiliAI</h1>
          <p className="text-xl text-gray-600">AI Utilities and Personal Payment Assistant on Celo Mini Pay</p>
        </header>

        {address ? (
          // If address exists, load the Chat Layout component
          <ChatLayout />
        ) : (
          // Otherwise, display the current page with transaction actions
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Get Started with AkiliAI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
                  onClick={() => console.log("Installing desktop app...")}
                  onMouseEnter={() => updateState({ showInstallTooltip: true })}
                  onMouseLeave={() => updateState({ showInstallTooltip: false })}
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
                <div className="relative">
                  {state.showInstallTooltip && (
                    <div className="absolute top-full mt-2 p-2 bg-black text-white text-sm rounded shadow-lg">
                      MiniPay is the runtime environment required for AkiliAI
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
