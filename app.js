var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy');
//
// Target Http Server
//
var proxy = new httpProxy.createProxyServer();
http.createServer(function (request, response) {
    /*
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('request successfully proxied to: ' + request.url + '\n' + JSON.stringify(request.headers, true, 2));
    response.end();
    //*/
    console.log('request successfully proxied to: ' + request.url);
    var addresses =
        {
            host: request.headers.host,
            port: request.headers.port
        };
    setTimeout(function () {
        proxy.web(request, response, {target:addresses});
    },200);
}).listen(9003);
