// just for the example require the index of this package
const LDB = require("../index");
//use this if installed via npm i language-db
//const LDB = require("language-db");
console.log("TEST: ARRAY GIVEN, LANGUAGE de");
const translate = new LDB(["./de.json", "./en.json"]);
translate.setLanguageCode("de");
console.log(translate.get("intro") + "\n");

console.log("TEST: ARRAY GIVEN, LANGUAGE en");
translate.setLanguageCode("en");
console.log(translate.get("intro") + "\n");
