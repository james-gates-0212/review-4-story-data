/** @type {import('next').NextConfig} */
const ChildProcess = require('child_process');

const nextConfig = {
  generateBuildId: async () => {
    // This could be anything, using the latest git hash
    const commitHash = ChildProcess.execSync('git log --pretty=format:"%h" -n1').toString().trim();
    return process.env.GIT_HASH || commitHash;
  },
  webpack: (config, context) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader',
    });
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['sequelize'],
  },
};

module.exports = nextConfig;
