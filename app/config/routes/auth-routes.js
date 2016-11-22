const passport = require('passport');

module.exports.routes = function(app) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
    /**
     * Logout user
     **/
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /**
   * Receive Signin Form Data
  **/
  app.post('/signin',
    passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/dashboard');
  });

  /**
   * Display Signup Form
  **/
  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'Signup to UBC Rec',
      message: 'Signup for UBC Rec',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });

  /**
   * Receive Signup Form Data
  **/
  app.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: '/signup' },
    function(req, res) {
      console.log("here");
      console.log(req);
      console.log(res);
      res.redirect('/dashboard');
    })
  );
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  } else {
    return next();
  }
};
/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
    var that = this;

    return function(req, res, next) {
        requiresLogin(req, res, function() {

          if (roles.isAdmin && roles.isAdmin !== req.user.isAdmin) {
              return res.status(403).send({
                  message: 'User is not authorized'
              });
          }

          if (roles.isInstructor && roles.isInstructor !== req.user.isInstructor) {
              return res.status(403).send({
                  message: 'User is not authorized'
              });
          }

          if (roles.isUBC && roles.isUBC !== req.user.isUBC) {
              return res.status(403).send({
                  message: 'User is not authorized'
              });
          }

          return next();
        });
    };
};
