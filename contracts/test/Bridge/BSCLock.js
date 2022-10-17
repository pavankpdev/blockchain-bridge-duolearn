const { expect } = require('../chai-setup');
const { setupBridge } = require('./fixtures');
const { ethers } = require('hardhat');
const { getSignature } = require('./util');

describe("BSCLock.sol", async () => {

    describe('deployment tests', () => {

        it('correct values', async () => {
            const { BSCLock, BSCToken, signer } = await setupBridge();

            expect(await BSCLock.token()).to.eq(BSCToken.address);
            expect(await BSCLock.approvedSigner()).to.eq(signer.address);
        });

        it('admin can change singer', async () => {
            const { BSCLock, deployer } = await setupBridge();
            await expect(BSCLock.setSigner(deployer.address))
                .to.emit(BSCLock, 'SetSigner')
                .withArgs(deployer.address);
        });
    });

    describe('lock-unlock', async () => {
        const amount = ethers.utils.parseEther('1000');

        it('user can lock tokens', async () => {
            const { BSCLock, users, BSCToken, deployer } = await setupBridge();
            const [alice, bob] = users;
            await deployer.BSCToken.transfer(alice.address, ethers.utils.parseEther('10000'));
            await deployer.BSCToken.transfer(bob.address, ethers.utils.parseEther('10000'));

            await alice.BSCToken.approve(BSCLock.address, amount);
            await expect(alice.BSCLock.lockTokens(amount))
                .to.emit(BSCToken, 'Transfer')
                .withArgs(alice.address, BSCLock.address, amount);
        });

        it('signer can unlock tokens for user', async () => {
            const { BSCLock, users, BSCToken, deployer, signer } = await setupBridge();
            const [alice, bob] = users;

            await deployer.BSCToken.transfer(alice.address, ethers.utils.parseEther('10000'));
            await deployer.BSCToken.transfer(bob.address, ethers.utils.parseEther('10000'));

            await alice.BSCToken.approve(BSCLock.address, amount);
            await alice.BSCLock.lockTokens(amount);
            const calldata = [
                alice.address,
                amount,
                'dummy txn hash',
                'BSC',
                '1.0',
            ];
            const signature = await getSignature({ calldata, signer });

            await expect(
                alice.BSCLock.releaseTokens(
                    alice.address,
                    amount,
                    'dummy txn hash',
                    signature
                )
            )
                .to.emit(BSCToken, 'Transfer')
                .withArgs(BSCLock.address, alice.address, amount);
        });
    })
})