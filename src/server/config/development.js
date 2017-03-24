module.exports = {
  port: process.env.PORT || 8080,
  subDomain: process.env.SUBDOMAIN || 'www.react-hello-world.dev',
  protocol: process.env.SUBDOMAIN ? 'https://' : 'http://',

};
