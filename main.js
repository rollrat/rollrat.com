const http = require("http");
const fs = require('fs');


http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("<a href=\"https://blog.naver.com/rollrat\">ROLLRAT LIBRARY</a>\n");
}).listen(80);