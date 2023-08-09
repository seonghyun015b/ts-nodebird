"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = http.createServer(function (req, res) {
    console.log(req.url, req.method);
    res.write('<h1>Hello Node</h1>');
    res.write('<h2>Hello Node</h2>');
    res.write('<h3>Hello Node</h3>');
    res.write('<h4>Hello Node</h4>');
    res.end('<h5>Hello node</h5>');
});
server.listen(3065, function () {
    console.log('3065 포트에서 서버 대기중');
});
