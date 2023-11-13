import express, { Request } from 'express';
import { Op } from 'sequelize';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';

const router = express.Router();

// 게시글 로드
router.get<any, any, any, { lastId: string; limit: string }>(
  '/',
  async (req: Request<any, any, any, { lastId: string; limit: string }>, res, next) => {
    try {
      let where = {};
      if (parseInt(req.query.lastId, 10)) {
        where = {
          id: { [Op.lt]: parseInt(req.query.lastId, 10) },
        };
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
  }
);

export default router;
