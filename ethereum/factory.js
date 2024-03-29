import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    CampaignFactory.abi, "0x91e8cF79321122c8BeDeDD1710b33d984c86e410"
);

export default instance;
