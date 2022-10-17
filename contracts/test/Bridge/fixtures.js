const {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} = require("hardhat");
const { setupUsers, setupUser } = require('../utils');

const setupBridge = deployments.createFixture(async () => {
    // Deployment Setup
    await deployments.fixture([
        'BSCLock',
        'PolyToken',
        'PolyDeposit',
        'BSCToken',
    ]);
    const BSCLock = (await ethers.getContract('BSCLock'))
    const PolyToken = (await ethers.getContract('PolyToken'))

    const PolyDeposit = (await ethers.getContract(
        'PolyDeposit'
    ))
    const BSCToken = (await ethers.getContract('BSCToken'))
    // Account Setup
    const accounts = await getNamedAccounts();
    const unnamedAccounts = await getUnnamedAccounts();
    const users = await setupUsers(unnamedAccounts, {
        BSCLock,
        PolyToken,
        PolyDeposit,
        BSCToken,
    });
    const deployer = await setupUser(accounts.deployer, {
        BSCLock,
        PolyToken,
        PolyDeposit,
        BSCToken,
    });
    
    const signer = await setupUser(accounts.signer, {
        BSCLock,
        PolyToken,
        PolyDeposit,
        BSCToken,
    });

    return { users, deployer, signer, BSCLock, PolyToken, PolyDeposit, BSCToken };
});

 module.exports = {setupBridge};