"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    res.json([
        { id: 1, content: 'Hello' },
        { id: 2, content: 'Hello' },
        { id: 3, content: 'Hello' },
    ]);
});
router.delete('/', function (req, res) {
    res.json([{ id: 1 }, { id: 2 }]);
});
exports.default = router;
