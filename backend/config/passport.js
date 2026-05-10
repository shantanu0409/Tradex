const passport =
  require("passport");

const GoogleStrategy =
  require(
    "passport-google-oauth20"
  ).Strategy;

const jwt =
  require("jsonwebtoken");

const {
  UserModel,
} = require(
  "../model/UserModel"
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "/auth/google/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        let user =
          await UserModel.findOne({
            email:
              profile.emails[0]
                .value,
          });

        if (!user) {
          user =
            await UserModel.create({
              fullname:
                profile.displayName,
              email:
                profile.emails[0]
                  .value,
              googleId:
                profile.id,
              profilePicture:
                profile.photos?.[0]
                  ?.value,
              balance:
                100000,
            });
        }

        const token =
          jwt.sign(
            {
              userId:
                user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn:
                "7d",
            }
          );

        done(null, {
          user,
          token,
        });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports =
  passport;