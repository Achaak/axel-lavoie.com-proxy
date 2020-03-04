// Dependencies
const express = require('express');
const { createProxyMiddleware  } = require('http-proxy-middleware');

// Config
const { routes } = require('./config.json');

const app = express();


for (route of routes) {
    app.use(route.route, 
        createProxyMiddleware({ 
            target: route.address, // target host
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            pathRewrite: {
                ['^'+route.route]: '/', // rewrite path
            },
        }
    ));
}

app.listen(80, () => {
    console.log('Proxy listening on port 80');
});