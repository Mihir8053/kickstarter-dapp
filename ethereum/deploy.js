const { Web3 } = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const compiledFactory = require("./build/CampaignFactory.json");
// console.log(Object.keys(compiledFactory));
// console.log(Object.keys(compiledFactory.evm));
// console.log(compiledFactory.evm.bytecode);

async function main() {
    // Configuring the connection to an Ethereum node
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`,
        ),
    );
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        '0x' + process.env.SIGNER_PRIVATE_KEY,
    );
    web3.eth.accounts.wallet.add(signer);
    // Using the signing account to deploy the contract
    const contract = new web3.eth.Contract(compiledFactory.abi);
    contract.options.data = compiledFactory.evm.bytecode.object;
    const deployTx = contract.deploy();
    const deployedContract = await deployTx
        .send({
            from: signer.address,
            gas: await deployTx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
            console.log(`Mining deployment transaction ...`);
            console.log(`https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`);
        });
    // The contract is now deployed on chain!
    console.log(`Contract deployed at ${deployedContract.options.address}`);
    console.log(
        `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`,
    );
}

require("dotenv").config();
main();