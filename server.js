var express = require('express')
  , basicAuth = require('basic-auth-connect')
  , logfmt = require("logfmt")
  , fs = require('fs')
  ;

// Constants
var SERVER_PORT = process.env.PORT || 9000;

var serveDirectories = function (app, directories) {
  app.use(logfmt.requestLogger());

  // Create the asset server
  directories.forEach(function (directory) {
    app.use("/", express.static(directory));
  });

  //Create the mock data server
  app.get("/api/:endpoint", function (req, res) {
    var path = 'mock_data/' + req.params.endpoint + '.json';
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        res.status(404).send('mock data not found');
      }
      res.send(data);
    });
  });

  app.listen(SERVER_PORT);
};


var app = express();

if (process.env.NODE_ENV === 'development') {
  serveDirectories(app, ['./tmp', './app']);
} else {
  app.use(basicAuth('policy-engine', 'openstack'));
  serveDirectories(app, ['./build']);
}
