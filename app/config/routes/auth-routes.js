const passport = require('passport');

module.exports.routes = function(app) {
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
      title: 'Your title',
      message: 'Your Message',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });

  /**
   * Receive Signup Form Data
  **/
  app.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: '/signup' }),
    function(req, res) {
      res.redirect('/');
  });
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
        that.requiresLogin(req, res, function() {
            if (roles.isAdmin === req.user.isAdmin && roles.isInstructor === req.user.isInstructor && roles.isUBC === req.user.isUBC) {
                return next();
            } else {
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};
