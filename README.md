##Developer Setup Instructions

```
npm install -g gulp
npm install
gulp serve:app
```

Then point your browser to http://localhost:9000

##Ubuntu Deployment Instructions
(Tested on Ubuntu 14.04.2 LTS)
```
sudo apt-get update
sudo apt-get install git
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy

sudo chown -R $USER /usr/local
npm install -g gulp

git clone https://github.com/thomasstreet/policy-engine.git
cd policy-engine
git checkout master
npm install
gulp compile
gulp serve:build
```

Access demo at http://localhost:9000
Username: policy-engine
Password: openstack

##Update GUI code

Access GUI folder (e.g. cd policy-engine)
```
git pull origin master
gulp compile
gulp serve:build
```

##Heroku deployments

##Pull request workflow

##Merging in latest code

##Setting up private keys with Github