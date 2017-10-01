// just for the example require the index of this package
const LDB = require("../index");
//use this if installed via npm i language-db
//const LDB = require("language-db");
console.log("TEST: ADDKEY, LANGUAGE en");
const translate = new LDB({"en": {"intro":"this is an intro text"}});
translate.setLanguageCode("en");
//translate.add("en", "text", "this is not the intro text")
translate.add("en", { "text": "this is not the intro text, and has been overriden" })
translate.add("en",  "text" ,"this is not the intro text, and has been overriden" )
console.log(translate.get("text"));
