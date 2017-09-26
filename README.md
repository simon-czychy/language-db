# Langauge-DB

A simple lightweight package for handling langauge keys.


## Why language-db?

Langauge-db is a simple lightweight package for handling langauge keys. You can load up langauge key value pairs from files, arrays and objects.
### Features

* Lightweight
* Simple usage
* Compatible with [mysql2](https://www.npmjs.com/package/mysql2)
* Uses modern ES6 code

## Install


```bash
$ npm install language-db --save
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
* key [string]

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

## Using MySQL

You can use an MySQL Database to get laguagekeys from it. Language-db uses a default schema but you can also add your own selecting schema.
[Default Schema](/examples/default_schema.PNG) |
[Custom Schema](/examples/custom_schema.PNG)

### Setting up MySQL Connection


After you required language-db, create an object of language-db without parameters. Tell it to use mysql as database type. Finally call the setup() function and passan object with your connection details. This example will use the default schema.

```javascript
var translate = new LDB();
var db = translate.use("mysql");
translate.setup({
	"host": "localhost",
	"user": "root",
	"password": "",
	"database": "language_db"
});
```

#### Using your own schema

To use you own schema just pass an query template to your connection details e.g.:
```javascript
translate.setup({
	"host": "localhost",
	"user": "root",
	"password": "12345",
	"database": "language_db",
	"query": "SELECT value FROM ldb WHERE code = $CODE AND langkey = $KEY"
});
```
**IMPORTANT: You need to sepcify $CODE where your languageCode goes and $KEY where your key goes.**

## MySQL API

### LDB.get(key, callback)
* key [string]
* callback [fn(result)]

You can get the translation by the passed key with the get() function. If using the get function while MySQL is used, the function is asnyc to wait for an answer.

##### Example:


```javascript
translate.setLanguageCode("en");
//Now the get() function needs to be async
translate.get("intro", function(result) {
	if(!result)
		throw new Error("No result recieved!")
	console.log((result));
});
```
This will output:
> this is an intro text


## Planned Features

* Database Connection (MongoDB)
* MySQL(Add keys and languages)
