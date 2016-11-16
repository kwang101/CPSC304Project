module.exports = function(app) {
  // All default routes
  require('./default-routes')(app);

  // All signup / signin routes
  require('./auth-routes').routes(app);

  // All Instructor routes
  require('./instructor-routes')(app);

  // All Create Class routes
  require('./createclass-routes')(app);

  // Edit Class routes
  require('./editclass-routes')(app);

  //dashboard
  require('./dashboard-routes')(app);

  //user dashboards
  require('./users-routes')(app);

  //program dashboards
  require('./program-routes')(app);

}
