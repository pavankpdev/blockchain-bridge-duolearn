
const func = async function (hre) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy('PolyToken', {
        from: deployer,
        log: true,
        args: [deployer]
    });
};

module.exports = func;
func.tags = ['PolyToken','Polygon'];