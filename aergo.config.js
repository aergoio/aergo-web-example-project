module.exports = (config) => ({
    contracts: {
        'contract-inc.lua': {
            chainId: config.env === 'local' ? 'dev.chain' : 'testnet.aergo.io',
            arguments: [10]
        },
    },
});