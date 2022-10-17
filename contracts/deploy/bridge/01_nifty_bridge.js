const { ethers } = require('hardhat');

const func = async function (hre) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, signer } = await getNamedAccounts();

    const PolyTokenDep = (await deployments.get('PolyToken'));

    const PolyDeposit = await deploy('PolyDeposit', {
        from: deployer,
        args: [PolyTokenDep.address, signer],
        skipIfAlreadyDeployed: true,
        log: true,
    });

    await deployments.get('PolyDeposit');

    const PolyToken = (await ethers.getContractAt(
        'PolyToken',
        PolyTokenDep.address,
        deployer
    ));

    if (
        (await PolyToken.getDepositAdmin()).toLowerCase() !==
        PolyDeposit.address.toLowerCase()
    ) {
        await (await PolyToken.setDepositAdmin(PolyDeposit.address)).wait();
    }
};

func.tags = ['PolyDeposit', 'Polygon', 'L2'];
func.dependencies = ['PolyToken'];
module.exports = func;