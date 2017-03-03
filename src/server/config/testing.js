module.exports = {
  /* eslint-disable */
  port: Math.floor(Math.random() * (65535 - 49152) + 49152),
  subDomain: process.env.SUBDOMAIN || 'www.react-hello-world.dev',
  /* eslint-enable */
};
