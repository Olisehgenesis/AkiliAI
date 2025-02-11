<p align="center">
  <img width="100px" src="https://github.com/celo-org/celo-composer/blob/main/images/readme/celo_isotype.svg" align="center" alt="Celo" />
 <h2 align="center">AkiliAI - AI-powered Utility and Personal Payment Assistant</h2>
 <p align="center">Seamlessly integrating AI and blockchain for smart financial transactions on Celo MiniPay.</p>
</p>
  <p align="center">
    <a href="https://github.com/your-repo/akiliai/graphs/stars">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/stars/your-repo/akiliai?color=FCFF52" />
    </a>
    <a href="https://github.com/your-repo/akiliai/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/your-repo/akiliai?color=E7E3D4" />
    </a>
    <a href="https://github.com/your-repo/akiliai/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/your-repo/akiliai?color=E7E3D4" />
    </a>
    <a href="https://github.com/your-repo/akiliai/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/your-repo/akiliai?color=E7E3D4" />
    </a>
    <a href="https://opensource.org/license/mit/">
      <img alt="MIT License" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
  </p>
</p>

## About The Project

AkiliAI is an AI-powered utility and personal payment assistant built on Celo MiniPay. It seamlessly integrates smart contract capabilities with AI to provide a frictionless user experience for financial transactions and blockchain interactions. With AkiliAI, users can send payments, sign transactions, and interact with blockchain-based assets in an intuitive and efficient way.

## Built With

- [Celo](https://celo.org/)
- [Solidity](https://docs.soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [viem](https://viem.sh/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nebula AI](https://nebula.com/) (Alpha Phase)

## Prerequisites

- Node.js (v20 or higher)
- Git (v2.38 or higher)

## MiniPay Integration

AkiliAI leverages [MiniPay](https://www.opera.com/products/minipay) to offer a seamless experience for users making transactions and interacting with blockchain-based AI services. MiniPay ensures smooth onboarding and wallet integration, making AkiliAI easily accessible to millions of users.

## Getting Started

### Install Dependencies

Run the following command to install required dependencies:

```bash
npm install
```

or

```bash
yarn
```

### Deploy a Smart Contract

To deploy the AkiliAI smart contract:

1. Rename `packages/hardhat/.env.template` to `packages/hardhat/.env` and add your `PRIVATE_KEY`.
2. Ensure your wallet is funded with test tokens from the [Celo Faucet](https://faucet.celo.org/alfajores).
3. Deploy the contract:

```bash
npx hardhat ignition deploy ./ignition/modules/AkiliAI.ts --network alfajores
```

### Deploy Frontend Locally

1. Rename `packages/react-app/.env.template` to `packages/react-app/.env`.
2. Add your WalletConnect Cloud Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).
3. Run the frontend locally:

```bash
yarn dev
```

or

```bash
npm run dev
```

## Usage

AkiliAI provides the following functionalities:
- AI-driven financial insights and automation.
- Smart contract interactions.
- Blockchain-based transaction processing.

## Roadmap

- [ ] Enhanced AI-driven transaction predictions.
- [ ] Multi-wallet support.
- [ ] Expanded smart contract functionalities.

## Contributing

We welcome contributions! Feel free to open issues and PRs.

## License

Distributed under the MIT License. See `LICENSE.txt` for details.

## Contact

- Twitter: [@olisehgenesis](https://twitter.com/illmindofbanana)
- Discord: [Celo Community](https://discord.com/invite/celo)

