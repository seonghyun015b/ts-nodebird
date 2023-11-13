const express = require('express');

const { Post, User, Image, Comment } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// GET / posts 게시글 불러오기

router.get('/', async (req, res, next) => {
  try {
    const where = {};

    if (parseInt(req.query.lastId)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        { model: User, attributes: ['id', 'nickname'] },
        { model: Image },
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
        { model: User, as: 'Likers', attributes: ['id'] },
        {
          model: Post,
          as: 'Retweet',
          include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
