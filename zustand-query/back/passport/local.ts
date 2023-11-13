import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user';

export default () => {
  passport.use(
    'local',
    new Strategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });

          if (!user) {
            return done(null, false, { message: '존재하지 않는 이메일입니다.' });
          }

          const result = await bcrypt.compare(password, user.password);

          if (result) {
            return done(null, user);
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
