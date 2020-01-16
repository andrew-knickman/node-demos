/*
use "npm init" command
npm will ask a few conig questions
e.g.
mkdir COSC484
cd COSC484

make a node.js file (see below)

entry point is the class it will start from

after all data entered, it will create a package.json file for your project

subl package.json
npm install request --save
adds request as a dependency (with version number) to package.json

npm install

npm install will look for dependency tags  in COSC484 project
*/ 

var request = require('request');
var cheerio = require('cheerio');