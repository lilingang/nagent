httpProxy = require('http-proxy');
/*
var proxy = httpProxy.createServer({
    target:'http://nagent.herokuapp.com:80'
    //target:'http://localhost:3000'
}).listen(8087);
*/

var http = require('http'),
    httpProxy = require('http-proxy');


var proxy = new httpProxy.createProxyServer();
http.createServer(function (req, res) {
    var realyhost = req.headers.host;
    req.headers.host = 'nagent.heroku.com';
    //req.setParameter("realyhost",realyhost);
    if(realyhost != 'nagent.heroku.com'){
        setTimeout(function () {
            proxy.web(req, res, {
                target: 'http://nagent.herokuapp.com:80'
            });
        }, 200);
    }else{
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Can not proxy: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
        res.end();
    }
}).listen(8087);
/*
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});

//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

//
// Listen for the `open` event on `proxy`.
//
proxy.on('open', function (proxySocket) {
  // listen for messages coming FROM the target here
  proxySocket.on('data', hybiParseAndLogMessage);
});

//
// Listen for the `close` event on `proxy`.
//
proxy.on('close', function (req, socket, head) {
  // view disconnected websocket connections
  console.log('Client disconnected');
});
*/