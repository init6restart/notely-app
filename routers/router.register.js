'use strict';
var noteRouter = require("./note/note.router.js");

var register = function (app) {
  app.use('/', noteRouter);
};

module.exports = register;