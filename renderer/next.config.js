module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
  // Fix exporting enums from outside Next root
  // experimental: {
  //   externalDir: true,
  // },
};
