const { expect } = require('../chai-setup');
const { setupBridge } = require('./fixtures');
const { ethers } = require('hardhat');
const { getSignature } = require('./util');

describe("PolyDeposit.sol", async () => {

    describe('deployment tests', () => {

        it('correct values', async () => {
            const { PolyDeposit, PolyToken, signer } = await setupBridge();

            expect(await PolyDeposit.token()).to.eq(PolyToken.address);
            expect(await PolyDeposit.approvedSigner()).to.eq(signer.address);
            expect(await PolyToken.getDepositAdmin()).to.eq(PolyDeposit.address);

        });

        it('owner can pause-unpause', async () => {
            const { PolyDeposit, PolyToken, deployer, users } = await setupBridge();
            const [alice, bob] = users;

            await deployer.PolyToken.pause();
            const amount = ethers.utils.parseEther('1');
            await PolyToken.setDepositAdmin(deployer.address);

            await expect(
                PolyToken.deposit(
                    alice.address,
                    ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
                )
            ).to.be.revertedWith('Pausable: paused');

            await deployer.PolyToken.unpause();

            await PolyToken.deposit(
                alice.address,
                ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
            );
        });

    });

    describe('deposit-burn', async () => {
        it('only admin can call deposit', async () => {
            const { PolyDeposit, PolyToken, deployer, users } = await setupBridge();
            const [alice, bob] = users;
            const amount = ethers.utils.parseEther('1');
            await expect(
                PolyToken.deposit(
                    alice.address,
                    ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
                )
            ).to.be.revertedWith('Deposit: caller is not the admin');
            await PolyToken.setDepositAdmin(deployer.address);

            await expect(
                PolyToken.deposit(
                    alice.address,
                    ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
                )
            )
                .to.emit(PolyToken, 'Transfer')
                .withArgs(ethers.constants.AddressZero, alice.address, amount);
            expect(await alice.PolyToken.balanceOf(alice.address)).to.eq(amount);
        });

        it('user can burn tokens', async () => {
            const { PolyDeposit, PolyToken, deployer, users } = await setupBridge();
            const [alice, bob] = users;
            await PolyToken.setDepositAdmin(deployer.address);
            const amount = ethers.utils.parseEther('1');
            await PolyToken.deposit(
                alice.address,
                ethers.utils.defaultAbiCoder.encode(['uint256'], [amount])
            );
            await alice.PolyToken.burn(amount);
            expect(await alice.PolyToken.balanceOf(alice.address)).to.eq(0);
        });
    })
})