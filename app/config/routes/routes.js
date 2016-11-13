module.exports = function(app) {
  // All default routes
  require('./default-routes')(app);

  // All signup / signin routes
  require('./signup-routes')(app);

  // Add future routes here

  //dashboard
  require('./dashboard-routes')(app);

  //register
  require('./register-routes')(app);

  //user dashboards
  require('./users-routes')(app);

}
