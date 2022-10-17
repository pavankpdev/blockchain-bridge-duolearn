const func = async function (hre) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, signer } = await getNamedAccounts();

    const BSCToken = (await deployments.get('BSCToken'));

    await deploy('BSCLock', {
        from: deployer,
        args: [BSCToken.address, signer],
        skipIfAlreadyDeployed: true,
        log: true,
    });
};

func.tags = ['BSCLock', 'BSC', 'L1'];
func.dependencies = ['BSCToken'];

module.exports = func;