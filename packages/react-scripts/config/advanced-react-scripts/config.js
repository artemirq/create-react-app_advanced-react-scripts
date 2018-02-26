const mapObject = require('./utils/map-object');

const customizers = {
  babelPresets: {
    BABEL_STAGE_0: {
      get: () => require.resolve('babel-preset-stage-0'),
    },
  },
  babelPlugins: {
    PROPOSAL_DECORATORS: {
      get: () => require.resolve('@babel/plugin-proposal-decorators'),
    },
    PROPOSAL_CLASS_PROPERTIES: {
      get: () => [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
    },
  },
  webpackLoaders: require('./customizers/webpack-loaders'),
};

module.exports = (env, isDev) => {
  return mapObject(customizers, group => {
    return mapObject(
      group,
      (customizer, key) => {
        const envValue = process.env['REACT_APP_' + key];
        const activeEnvValue = env && envValue && envValue !== 'false';
        return (activeEnvValue || customizer.default) && customizer.get(isDev);
      },
      true
    );
  });
};