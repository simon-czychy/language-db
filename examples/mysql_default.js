// just for the example require the index of this package
const LDB = require("../index");
//use this if installed via npm i language-db
//const LDB = require("language-db");
console.log("TEST: MYSQL, LANGUAGE en");
const translate = new LDB();
translate.use("mysql");
translate.setup({
	"host": "localhost",
	"user": "root",
	"password": "12345",
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
