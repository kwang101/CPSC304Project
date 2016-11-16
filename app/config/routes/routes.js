module.exports = function(app) {
  // All default routes
  require('./default-routes')(app);

  // All signup / signin routes
  require('./auth-routes').routes(app);

  // All Instructor routes
  require('./instructor-routes')(app);

  // All Create Class routes
  require('./createclass-routes')(app);
  // Add future routes here

  //dashboard
  require('./dashboard-routes')(app);

  //user dashboards
  require('./users-routes')(app);

  //program dashboards
  require('./program-routes')(app);

  //query-routes ...selection, division, etc.
  require('./query-routes')(app);

}
