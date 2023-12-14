const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Keys = require('./keys');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
        } catch (err) {
            return done(err, false, { message: 'Error en la autenticación' });
        }
    }));
};