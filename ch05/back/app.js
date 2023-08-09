"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send('Hello express');
});
app.get('/api', function (req, res) {
    res.send('Hello api');
});
app.get('/api/posts', function (req, res) {
    res.json([
        { id: 1, content: 'Hello1' },
        { id: 2, content: 'Hello2' },
        { id: 3, content: 'Hello3' },
    ]);
});
app.post('/post', function (req, res) {
    res.json([
        { id: 1, content: 'post1' },
        { id: 2, content: 'post2' },
        { id: 3, content: 'post3' },
    ]);
});
app.delete('/delete', function (req, res) {
    res.json([
        { id: 1, content: 'delete1' },
        { id: 2, content: 'delete2' },
        { id: 3, content: 'delete3' },
    ]);
});
app.listen(3065, function () {
    console.log('서버 실행 중');
});
