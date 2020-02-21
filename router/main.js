
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
require('./format.js');

var view_count = 0;
var ip_table = {};

var server_starts = new Date();

module.exports = function (app) {
  app.use(favicon('./public/res/img/favicon.ico'));
  app.get('/', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("<a href=\"https://blog.naver.com/rollrat\">ROLLRAT LIBRARY</a></br>\n");
    view_count++;
    var addr = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    if (!(addr in ip_table))
      ip_table[addr] = 0;
    ip_table[addr] += 1;
    response.write('Server Starts: ' + server_starts.toString());
    response.write('</br>Connection Time: ' + (new Date()).toString());
    response.write('</br>Your IP: ' + addr);
    response.write('</br>Views Count: ' + view_count);
    response.write('</br>Visitors Count: ' + Object.keys(ip_table).length);
    response.write('</br>Your Views Count: ' + ip_table[addr]);
    response.write('</br>Email: <a href="mailto:rollrat.cse@gmail.com">rollrat.cse@gmail.com</a>')
    response.end();
  });
  app.use('/res', express.static('./public/res'));
  app.use('/*.*', function (req, res) {
    //if (req.baseUrl == '/notfound.html') {
      res.status(404);
      res.sendFile(path.resolve(__dirname + '/../public/notfound.html'));
    //} else {
    //  res.status(403);
    //  res.sendFile(path.resolve(__dirname + '/../public/forbidden.html'));
    //}
  });
  app.use('/*', function (req, res) {
    res.redirect('/notfound.html');
  });
};