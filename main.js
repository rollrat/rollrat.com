const http = require("http");
const fs = require('fs');

var view_count = 0;
var ip_table = {};

var server_starts = Date.now();

var server = http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<a href=\"https://blog.naver.com/rollrat\">ROLLRAT LIBRARY</a></br>\n");
    view_count++;
    var addr = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    if (!(addr in ip_table))
        ip_table[addr] = 0;
    ip_table[addr] += 1;
    response.write('Server Starts: ' + server_starts.format("yyyy-MM-dd hh:mm:ss"));
    response.write('Your IP: ' + addr);
    response.write('</br>Views Count: ' + view_count);
    response.write('</br>Visitors Count: ' + Object.keys(ip_table).length);
    response.write('</br>Your Views Count: ' + ip_table[addr]);
    response.end(); 
});

server.listen(80);