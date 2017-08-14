# Langauge-DB

A simple lightweight package for handling langauge keys.


## Install


```bash
$ npm install language-db
```

## Usage

Setup a JSOn-File and store you language keys e.g.:


```javascript
{
	"en": {
	    "intro": "this is an intro text",
		"content": "welcome to xyz page blabla"
	},
	"de": {
	    "intro": "Das ist ein einleitender Satz.",
		"content": "Willkommen auf Seite XYZ Blabla."
	}
}

```

Now load it up in your app e.g.:

```javascript
var LDB = require("language-db");
var translate = new LDB("./db.json");
translate.setLanguageCode("en");
console.log(translate.get("intro"));
```
This will output:
> this is an intro text

If you now change to an other language e.g.:

```javascript
translate.setLanguageCode("de");
```
This will output:
> Das ist ein einleitender Satz.

## Planned Features

* Object as argument
* Multiple files for specific sites
* Database Connection (SQL/MongoDB)
