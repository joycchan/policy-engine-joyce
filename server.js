var express = require('express')
  , basicAuth = require('basic-auth-connect')
  , logfmt = require("logfmt")
  , http = require('http')
  , bodyParser = require('body-parser')
  , url = require('url')
  , fs = require('fs')
  ;

// Constants
var SERVER_PORT = process.env.PORT || 9000;

var serveDirectories = function (app, directories) {
  app.use(logfmt.requestLogger());
  app.use(bodyParser.json()); // for parsing application/json

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

  app.post("/api/:endpoint", function (req, res) {
    res.send(201, req.body)
  });

  app.patch("/api/:endpoint/:id", function (req, res) {
    res.send(200, req.body)
  });

  app.delete("/api/:endpoint/:id", function (req, res) {
    res.send(204, null);
  });

  app.listen(SERVER_PORT);
};


exports.run = function (development) {
  var app = express();

  if (development) {
    serveDirectories(app, ['./tmp', './app']);
  } else {
    app.use(basicAuth('policy-engine', 'openstack'));
    serveDirectories(app, ['./build']);
  }
};

//If server.js is called directly (i.e. in Procfile), run production server
if (require.main === module) {
  exports.run();
}

