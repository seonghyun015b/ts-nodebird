"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    res.json([
        { id: 1, content: 'post1' },
        { id: 2, content: 'post2' },
        { id: 3, content: 'post3' },
    ]);
});
router.delete('/', function (req, res) {
    res.json([
        { id: 1, content: 'post delete1' },
        { id: 2, content: 'post delete2' },
        { id: 3, content: 'post delete3' },
    ]);
});
exports.default = router;
