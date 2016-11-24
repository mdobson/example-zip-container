var http = require('http');
var ws = require('ws');
var wss = ws.Server;

var wsServer = new wss({ noServer: true });

var server = http.createServer(function(req, res){
  var buf = [];
  req.on('data', function(d){
    buf += d;
  });

  req.on('end', function(){
    var retObj = {};
    retObj.body = buf;
    retObj.headers = req.headers;
    retObj.url = req.url;
    retObj.method = req.method;
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(retObj));
  });
});

server.on('upgrade', function(request, socket, headers) {
  console.log('upgraded');
  wsServer.handleUpgrade(request, socket, headers, function(ws) {
    console.log('upgrade handled');
    ws.on('message', function(data) {
      console.log('message:'+data);
      ws.send(data.toUpperCase());
    });

    ws.on('error', function(e){
      console.log('error:' + e);
    });

    ws.on('close', function(){
      console.log('closed');
    })

    ws.on('open', function(){
      console.log('opened');
    })
  });
});

server.listen(process.env.PORT || 3000);
