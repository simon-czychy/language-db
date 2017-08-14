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
    "intro": "this is an intro text",
	"content": "welcome to xyz page blabla"
}
```

Now load it up in your app e.g.:

```javascript
var LDB = require("language-db");
var translate = new LDB("./db.json");
console.log(translate.get("intro"));
```
This will output:
> this is an intro text


## Planned Features

* Object as argument
* Multilanguage System
* Multiple files for specific sites
* Database Connection (SQL/MongoDB)
