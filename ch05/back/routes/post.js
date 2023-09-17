const express = require('express');
const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 게시글 작성

router.post('/', isLoggedIn, async (req, res, next) => {});

module.exports = router;
