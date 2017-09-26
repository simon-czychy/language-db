// just for the example require the index of this package
var LDB = require("../index");
//use this if installed via npm i language-db
//var LDB = require("language-db");
console.log("TEST: MYSQL, LANGUAGE en");
var translate = new LDB();
var db = translate.use("mysql");
translate.setup({
	"host": "localhost",
	"user": "root",
	"pass": "12345",
	"database": "language_db"
});
translate.setLanguageCode("en");
//Now the get() function needs to be async
translate.get("intro", function(result) {
	addKeyToPage(result);
});

function addKeyToPage(result) {
	console.log(result);
}
