"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_1 = __importDefault(require("./routes/post"));
var db = require('./models');
var app = (0, express_1.default)();
db.sequelize
    .sync()
    .then(function () {
    console.log('db 연결 성공');
})
    .catch(console.error);
app.get('/', function (req, res) {
    res.send('Hello express');
});
app.get('/api', function (req, res) {
    res.send('Hello api');
});
app.use('/post', post_1.default);
app.listen(3065, function () {
    console.log('서버 실행 중');
});
