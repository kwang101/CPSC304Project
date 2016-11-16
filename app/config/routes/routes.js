module.exports = function(app) {
  // All default routes
  require('./default-routes')(app);

  // All signup / signin routes
  require('./signup-routes')(app);

  // All Instructor routes
  require('./instructor-routes')(app);

  // All Create Class routes
  require('./createclass-routes')(app);
  // Add future routes here

  require('./admin-routes')(app);
}
