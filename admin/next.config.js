const path = require("path");
const withTM = require("next-transpile-modules")([path.resolve("../shared")]);

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTM({
  output: 'standalone',
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: false,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
            titleProp: true,
            ref: true,
          },
        },
      ],
    });

    return config;
  },
});
