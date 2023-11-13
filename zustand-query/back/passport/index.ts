import passport from 'passport';
import User from '../models/user';
import local from './local';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    User.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['email', 'nickname'], as: 'Followers' },
        { model: User, attributes: ['email', 'nickname'], as: 'Followings' },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
