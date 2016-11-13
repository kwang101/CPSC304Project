module.exports = function(app) {
  // All default routes
  require('./default-routes')(app);

  // All signup / signin routes
  require('./signup-routes')(app);

  // Add future routes here

  //dashboard
  require('./dashboard-routes')(app);

  //user dashboards
  require('./users-routes')(app);

  //program dashboards
  require('./program-routes')(app);

}
