const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
    config.resolve.alias.set('@contract', path.resolve('../contract'));
    config.module.rule('athena').test(/\.lua$/).use('athena').loader('@aergo/athena-webpack-loader');
    return config;
  },
};
