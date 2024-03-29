const path = require("path");
const solc = require("solc");
const fs = require("fs-extra")

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);//delete the build folder to remove earlier instances of contract
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

const source = fs.readFileSync(campaignPath, "utf-8");

var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        },
        evmVersion: "london"
    }
};
// console.log(JSON.parse(solc.compile(JSON.stringify(input))));
const output = JSON.parse(solc.compile(JSON.stringify(input)));//compile the new contracts
fs.ensureDirSync(buildPath);//remake the build folder

for (let contractName in output.contracts['Campaign.sol']) {
    const contract = output.contracts['Campaign.sol'][contractName];
    fs.outputJSONSync(
        path.resolve(buildPath, contractName.replace(':', '') + ".json"),
        contract
    );
}