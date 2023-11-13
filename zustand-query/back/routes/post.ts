import express from 'express';
import path from 'path';
import Post from '../models/post';
import User from '../models/user';
import Comment from '../models/comment';
import Image from '../models/image';

import multer from 'multer';
import * as fs from 'fs';

import { isLoggedIn } from './middleware';

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

// 게시글 작성

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      UserId: req.user!.id,
    });

    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [
        { model: User, attributes: ['id', 'nickname'] },
        { model: Image },
        { model: User, as: 'Likers', attributes: ['id'] },
      ],
    });
    return res.json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 삭제

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId },
    });

    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user!.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ['id', 'nickname'] }],
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 리트윗
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{ model: Post, as: 'Retweet' }],
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    if (req.user!.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user!.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }

    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: { UserId: req.user?.id, RetweetId: retweetTargetId },
    });

    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }

    const retweet = await Post.create({
      UserId: req.user?.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }],
        },
        { model: User, attributes: ['id', 'nickname'] },
        { model: User, as: 'Likers', attributes: ['id'] },
        { model: Image },
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user?.id);
    res.json({ PostId: post.id, UserId: req.user?.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 싫어요
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user?.id);
    res.json({ PostId: post.id, UserId: req.user?.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 특정 게시글 로드

router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }],
        },
        { model: User, attributes: ['id', 'nickname'] },
        { model: User, as: 'Likers', attributes: ['id', 'nickname'] },
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
