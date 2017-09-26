// just for the example require the index of this package
var LDB = require("../index");
//use this if installed via npm i language-db
//var LDB = require("language-db");
console.log("TEST: ARRAY GIVEN, LANGUAGE de");
var translate = new LDB(["./de.json", "./en.json"]);
translate.setLanguageCode("de");
console.log(translate.get("intro") + "\n");

console.log("TEST: ARRAY GIVEN, LANGUAGE en");
var translate = new LDB(["./de.json", "./en.json"]);
translate.setLanguageCode("en");
console.log(translate.get("intro") + "\n");
