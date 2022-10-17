const { ethers } = require('hardhat');

async function setupUsers(
    addresses,
    contracts
){
    const users = [];
    for (const address of addresses) {
        users.push(await setupUser(address, contracts));
    }
    return users;
}

async function setupUser(
    address,
    contracts
){
    const user= { address };
    for (const key of Object.keys(contracts)) {
        user[key] = contracts[key].connect(await ethers.getSigner(address));
    }
    return user;
}

async function skipUnlessTest(hre){
    return hre.network.name !== 'hardhat';
}

module.exports = {
    setupUsers,
    setupUser,
    skipUnlessTest,
}