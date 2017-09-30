// just for the example require the index of this package
const LDB = require("../index");
//use this if installed via npm i language-db
//const LDB = require("language-db");
console.log("TEST: FILE GIVEN, LANGUAGE de");
let translate = new LDB("./de.json");
translate.setLanguageCode("de");
console.log(translate.get("intro") + "\n");

console.log("TEST: FILE GIVEN, LANGUAGE en");
translate = new LDB("./en.json");
translate.setLanguageCode("en");
console.log(translate.get("intro") + "\n");
