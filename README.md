# Langauge-DB

A simple lightweight package for handling langauge keys.


## Install


```bash
$ npm install language-db
```

## Usage

### General Usage

Setup a JSON-File and store you language keys e.g.:


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
let LDB = require("language-db");
let translate = new LDB("./db.json");
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

## API

### LDB.load(database), LDB.construtor(database)
* database [string] | [Object] | [Array]

The constructor calls the load() function if the passed argument database is given. If not you need to load your languagekeys with the load function.
You can use the load function anytime to load additional langugekeys.

#### Example:


```javascript
var translate = new LDB({
    "en": {
        "intro": "this is an intro text"
    }
}
);

translate.load("./de.json");
translate.load(["./de.json", "./it.json"]);
```

### LDB.setLanguageCode(code)
* code [string]

You can set the languagecode to get the right translation for your key.

#### Example:


```javascript
var translate = new LDB({
    "en": {
        "intro": "this is an intro text"
    }
}
);

translate.setLanguageCode("en");
```

### LDB.get(key)
* key [string] | (default: en)

You can get the translation by the passed key with the get() function.

#### Example:


```javascript
var translate = new LDB({
    "en": {
        "intro": "this is an intro text"
    }
}
);

translate.get("intro");
```

### LDB.add(languageCode, key [, value])
* langaueCode [string]
* key [string] | [Object]
* [optional if key is an Object] value [string]

You can add an key-value pair on runtime with the add() function. BEWARE: The keye added on runtime will be lost after restarting your application, they are not saved to your file.

#### Example:


```javascript
var translate = new LDB({"en": {"intro":"this is an intro text"}});
translate.setLanguageCode("en");
translate.add("en", "text", "this is not the intro text")
translate.add("en", { "text": "this is not the intro text, and has been overriden" })
console.log(translate.get("text"));
```
This will output:
> this is an intro text, and has been overriden


## Planned Features

* Database Connection (SQL/MongoDB)
