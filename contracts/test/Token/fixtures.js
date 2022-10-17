const {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} = require("hardhat");
const { setupUsers, setupUser } = require('../utils');
const { AbiCoder } = require('@ethersproject/abi');
const abiCoder = new AbiCoder();

const setupToken = deployments.createFixture(async () => {
    // Deployment Setup
    await deployments.fixture('BSCToken');
    const token = await ethers.getContract('BSCToken');
    // Account Setup
    const accounts = await getNamedAccounts();
    const unnamedAccounts = await getUnnamedAccounts();
    const users = await setupUsers(unnamedAccounts, { token });
    const deployer = await setupUser(accounts.deployer, { token });
    return { users, deployer, token };
});

 module.exports = {setupToken};