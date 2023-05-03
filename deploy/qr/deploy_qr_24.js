// const { assert } = require('chai');
const hre = require('hardhat');
const { getChainId } = hre;

// change number
const VERSION = 24;

module.exports = async ({ deployments, getNamedAccounts }) => {
    console.log('running deploy script: deploy script ' + VERSION.toString());
    console.log('network id ', await getChainId());

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    // 1inch address, merkle root, tree height
    const args = ['0x111111111117dC0aa78b770fA6A738034120C302', '0xc5711fcfebd7feca1652b176cff0b3fc', 9];

    const deployScriptName = 'MerkleDrop128-' + VERSION.toString();
    const merkleDrop128 = await deploy(deployScriptName, {
        contract: 'SignatureMerkleDrop128',
        from: deployer,
        args,
    });

    if (await getChainId() !== '31337') {
        await hre.run('verify:verify', {
            address: merkleDrop128.address,
            constructorArguments: args,
        });
    }
};

module.exports.skip = async () => true;
