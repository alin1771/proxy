const http = require('http');
const https = require('https');


const PROXY_HOST = 'graph.facebook.com';

const server = http.createServer((req, res) => {
    req.headers.host = PROXY_HOST;

    if (req.url.length < 5) {
        res.write("merge");
        res.end();
        return;
    }

    var proxy_req = https.request({
        method: req.method,
        host: PROXY_HOST, //req.headers.proxy_host,
        path: req.url,
        port: 443,
        headers: req.headers
    }, function (proxy_res) {
        res.writeHead(proxy_res.statusCode, proxy_res.headers);
        proxy_res.pipe(res);
    })

    req.pipe(proxy_req);
});

server.listen(process.env.PORT || 5540);