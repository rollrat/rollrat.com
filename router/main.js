
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
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write('<html><head><Title>ROLLRAT API</Title></head><body>');
    view_count++;
    var addr = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    if (!(addr in ip_table))
      ip_table[addr] = 0;
    ip_table[addr] += 1;
    response.write('<h1>ROLLRAT API SERVER</h1>');
    response.write('</br>When you enter this page, it means something is wrong.');
    response.write('</br>Server Starts: ' + server_starts.toString());
    response.write('</br>Connection Time: ' + (new Date()).toString());
    response.write('</br>Your IP: ' + addr);
    response.write('</br>Views Count: ' + view_count);
    response.write('</br>Visitors Count: ' + Object.keys(ip_table).length);
    response.write('</br>Your Views Count: ' + ip_table[addr]);
    response.write("</br>Blog: <a href=\"https://blog.naver.com/rollrat\">ROLLRAT LIBRARY</a>\n");
    response.write('</br>Email: <a href="mailto:rollrat.cse@gmail.com">rollrat.cse@gmail.com</a>');
    response.write('</br>Copyright (c) 2020. rollrat. All rights reserved.</br>');

    var sites = [
      ['왜냐맨', 'https://www.youtube.com/playlist?list=PLqlUleMK09pwLDP4WdxORzsaSR_2rQyX1'],
      ['워크맨', 'https://www.youtube.com/channel/UCwx6n_4OcLgzAGdty0RWCoA'],
    ];

    for (var e in sites) {
      response.write('</br>' + sites[e][0] + ': <a href="' + sites[e][1] + '">' + sites[e][1] + '</a>');
    }

    response.write('<!-- Global site tag (gtag.js) - Google Analytics -->');
    response.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-158827215-1"></script>');
    response.write('<script>');
    response.write(' window.dataLayer = window.dataLayer || [];');
    response.write(' function gtag(){dataLayer.push(arguments);}');
    response.write(' gtag(\'js\', new Date());');
    response.write('');
    response.write(' gtag(\'config\', \'UA-158827215-1\');');
    response.write('</script></body></html>');
    response.end();
  });
  app.use('/res', express.static('./public/res'));
  app.use('/*.*', function (req, res) {
    if (req.baseUrl == '/notfound.html') {
      res.status(404);
      res.sendFile(path.resolve(__dirname + '/../public/notfound.html'));
    } else {
      res.status(403);
      res.sendFile(path.resolve(__dirname + '/../public/forbidden.html'));
    }
  });
  app.use('/*', function (req, res) {
    res.redirect('/notfound.html');
  });
};