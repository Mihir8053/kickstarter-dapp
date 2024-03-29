# Decentralized kickstarter project

## Introduction

This project is an attempt to decentralize the existing kickstarter application. The project allows users to create campaigns and raise funding rounds.

## Technologies Used

- **Website**: NextJS, Semantic UI React (for CSS and styling)
- **Blockchain Network**: Ethereum
- **Smart Contracts**: Solidity programming language
- **Blockchain Wallet**: MetaMask
- **JavaScript Library**: Web3.js (for communicating with the blockchain)
- **Testing Framework**: Mocha
- **Local Blockchain Network (for testing smart contract)**: ganache-cli
- **Solidity Compiler**: solc

## Getting Started

1. Clone this repository.
2. Install the required packages using `npm install`.
3. Compile the smart contract:
   - `cd ethereum`
   - `node compile.js`
4. Run `npm run dev` to start the development server.
5. Access the application at `http://localhost:3000`.
6. To run the tests on the smart contract, start the ganache CLI by typing `ganache-cli` in the terminal, then run `npm run test`.
7. To deploy the smart contract to sepolia testnet
   - `cd ethereum`
   - `node deploy.js`

## Acknowledgements

Special thanks to Stephen Grider for his course ["Ethereum and Solidity: The Complete Developer's Guide"](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/) which provided valuable insights and knowledge for developing this project.
