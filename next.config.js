const withCss = require('@zeit/next-css');

if(typeof require !== 'undefined') {
	require.extensions['.css'] = () => {};
}

module.exports = withCss({
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL
  }
});
