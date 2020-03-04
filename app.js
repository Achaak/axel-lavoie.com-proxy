// Dependencies
const express = require('express');
const { createProxyMiddleware  } = require('http-proxy-middleware');

// Config
const { routes } = require('./config.json');

const app = express();


app.use('/CMS', createProxyMiddleware({ target: 'http://localhost:1337/', // target host
changeOrigin: true, // needed for virtual hosted sites
ws: true, // proxy websockets
pathRewrite: {
  '^/CMS': '/', // rewrite path
},
}));

app.use('/', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

app.listen(80, () => {
    console.log('Proxy listening on port 80');
});