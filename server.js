var express = require('express')
  , basicAuth = require('basic-auth-connect')
  , logfmt = require("logfmt")
  , http = require('http')
  , bodyParser = require('body-parser')
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

  app.post("/assignments", function (req, res) {

    var options = {
      host: req.body.serverIP,
      port: '8080',
      path: '﻿/restconf/config/policy:tenants',
      method: 'PUT',
      auth: 'admin:admin',
      headers: {
        'Content-type': 'application/yang.data+json',
        'Accept': 'application/yang.data+json'
      }
    };

    var body = JSON.stringify(
      {
        "policy:tenants": {
          "tenant": [
            {
              "contract": [
                {
                  "clause": [
                    {
                      "name": "allow-http-clause",
                      "subject-refs": [
                        "allow-http-subject",
                        "allow-icmp-subject"
                      ]
                    }
                  ],
                  "id": "22282cca-9a13-4d0c-a67e-a933ebb0b0ae",
                  "subject": [
                    {
                      "name": "allow-http-subject",
                      "rule": [
                        {
                          "classifier-ref": [
                            {
                              "direction": "in",
                              "name": "http-dest"
                            },
                            {
                              "direction": "out",
                              "name": "http-src"
                            }
                          ],
                          "name": "allow-http-rule"
                        }
                      ]
                    },
                    {
                      "name": "allow-icmp-subject",
                      "rule": [
                        {
                          "classifier-ref": [
                            {
                              "name": "icmp"
                            }
                          ],
                          "name": "allow-icmp-rule"
                        }
                      ]
                    }
                  ]
                }
              ],
              "endpoint-group": [
                {
                  "consumer-named-selector": [
                    {
                      "contract": [
                        "22282cca-9a13-4d0c-a67e-a933ebb0b0ae"
                      ],
                      "name": "e593f05d-96be-47ad-acd5-ba81465680d5-1eaf9a67-a171-42a8-9282-71cf702f61dd-22282cca-9a13-4d0c-a67e-a933ebb0b0ae"
                    }
                  ],
                  "id": "1eaf9a67-a171-42a8-9282-71cf702f61dd",
                  "network-domain": "77284c12-a569-4585-b244-af9b078acfe4",
                  "provider-named-selector": []
                },
                {
                  "consumer-named-selector": [],
                  "id": "e593f05d-96be-47ad-acd5-ba81465680d5",
                  "network-domain": "472ab051-554e-45be-a133-281f0a53412a",
                  "provider-named-selector": [
                    {
                      "contract": [
                        "22282cca-9a13-4d0c-a67e-a933ebb0b0ae"
                      ],
                      "name": "e593f05d-96be-47ad-acd5-ba81465680d5-1eaf9a67-a171-42a8-9282-71cf702f61dd-22282cca-9a13-4d0c-a67e-a933ebb0b0ae"
                    }
                  ]
                }
              ],
              "id": "f5c7d344-d1c7-4208-8531-2c2693657e12",
              "l2-bridge-domain": [
                {
                  "id": "70aeb9ea-4ca1-4fb9-9780-22b04b84a0d6",
                  "parent": "f2311f52-890f-4095-8b85-485ec8b92b3c"
                }
              ],
              "l2-flood-domain": [
                {
                  "id": "34cc1dd1-2c8c-4e61-a177-588b2d4133b4",
                  "parent": "70aeb9ea-4ca1-4fb9-9780-22b04b84a0d6"
                },
                {
                  "id": "6e669acf-2fd9-48ea-a9b0-cd98d933a6b8",
                  "parent": "70aeb9ea-4ca1-4fb9-9780-22b04b84a0d6"
                }
              ],
              "l3-context": [
                {
                  "id": "f2311f52-890f-4095-8b85-485ec8b92b3c"
                }
              ],
              "subject-feature-instances": {
                "classifier-instance": [
                  {
                    "classifier-definition-id": "4250ab32-e8b8-445a-aebb-e1bd2cdd291f",
                    "name": "http-dest",
                    "parameter-value": [
                      {
                        "name": "type",
                        "string-value": "TCP"
                      },
                      {
                        "int-value": "80",
                        "name": "destport"
                      }
                    ]
                  },
                  {
                    "classifier-definition-id": "4250ab32-e8b8-445a-aebb-e1bd2cdd291f",
                    "name": "http-src",
                    "parameter-value": [
                      {
                        "name": "type",
                        "string-value": "TCP"
                      },
                      {
                        "int-value": "80",
                        "name": "sourceport"
                      }
                    ]
                  },
                  {
                    "classifier-definition-id": "79c6fdb2-1e1a-4832-af57-c65baf5c2335",
                    "name": "icmp",
                    "parameter-value": [
                      {
                        "int-value": "1",
                        "name": "proto"
                      }
                    ]
                  }
                ]
              },
              "subnet": [
                {
                  "id": "77284c12-a569-4585-b244-af9b078acfe4",
                  "ip-prefix": "10.0.35.1/24",
                  "parent": "34cc1dd1-2c8c-4e61-a177-588b2d4133b4",
                  "virtual-router-ip": "10.0.35.1"
                },
                {
                  "id": "472ab051-554e-45be-a133-281f0a53412a",
                  "ip-prefix": "10.0.36.1/24",
                  "parent": "6e669acf-2fd9-48ea-a9b0-cd98d933a6b8",
                  "virtual-router-ip": "10.0.36.1"
                }
              ]
            }
          ]
        }
      }
    );

    var req = http.request(options, function (res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });

    req.on('error', function (e) {
      console.log('problem with request: ' + e.message);
    });

    console.log('body', body);

    req.write(body);
    //console.log('req', req);
    req.end();
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
if(require.main === module) {
  exports.run();
}

