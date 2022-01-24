const https = require('https');

const PROXY_HOST = 'graph.facebook.com';

require('http').createServer((req, res) => {
    delete req.headers.host;
    req.pipe(https.request({
        method: req.method,
        host: PROXY_HOST, //req.headers.proxy_host,
        path: req.url,
        port: 443,
        headers: req.headers
    }, proxy_res => {
        res.writeHead(proxy_res.statusCode, proxy_res.headers);
        proxy_res.pipe(res);
    }));
}).listen(process.env.PORT || 5540);