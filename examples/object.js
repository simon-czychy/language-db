// just for the example require the index of this package
const LDB = require("../index");
//use this if installed via npm i language-db
//const LDB = require("language-db");
console.log("TEST: OBJECT GIVEN, LANGUAGE de");
const translate = new LDB({
	"en": {
	    "intro": "this is an intro text",
		"content": "welcome to xyz page blabla"
	},
	"de": {
	    "intro": "Das ist ein einleitender Satz.",
		"content": "Willkommen auf Seite XYZ Blabla."
	}
});
translate.setLanguageCode("de");
console.log(translate.get("intro") + "\n");

console.log("TEST: OBJECT GIVEN, LANGUAGE en");
translate.setLanguageCode("en");
console.log(translate.get("intro") + "\n");
