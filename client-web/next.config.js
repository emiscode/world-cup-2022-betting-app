/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const { i18n } = require("./next-i18next.config");

module.exports = {
  nextConfig,
  i18n,
};
