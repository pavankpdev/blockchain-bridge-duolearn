const { ethers } = require('ethers');
const { ethers: ethersHardhat } = require('hardhat');

async function getSignature({ calldata, signer }) {
    const hashToSign = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
            ['tuple(address,uint256,string,string,string)'],
            [calldata]
        )
    );
    const signature = await (
        await ethersHardhat.getSigner(signer.address)
    ).signMessage(ethers.utils.arrayify(hashToSign));
    return signature;
}

module.exports = { getSignature }