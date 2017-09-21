"use strict";

const KEY = require("./key");
const fs = require('fs');
const path = require("path");

module.exports = class LanguageDB {

	constructor(database) {
		this.keys = [];
		this.languageCode = "en";
		if(database)
			this.load(database);
	}

	load(database) {
		let values = {};
		if (typeof database === "string") {
			values = require(path.resolve(database));
			return this.addKeys(values);
		}
		else if(typeof database === "object" && !this.isArray(database)) {
			values = database;
			return this.addKeys(values);
		}
		else if(this.isArray(database)) {
			if (database.length > 0) {
				for (let i = 0; i < database.length; i++) {
					if (this._isFile(database[i])) {
						this.addKeys(require(path.resolve(database[i])));
					}
				}
			}
			else {
				throw new Error("Given databasearray is empty. Given: " + database);
			}
		}
		else {
			throw new Error("Could not load database. Given: " + database);
		}
	}

	addKeys(values) {
		if (values) {
			for(let key in values) {
				this.keys[key] = values[key];
			}
		}

	}
	add(languageCode, key, value) {
		if (languageCode) {
			if (key && value) {
				if (typeof key === "string" && typeof value === "string")  {
					if (key.length > 0 && value.length > 0) {
						this.keys[languageCode][key] = value;
					}
				}
			}
			if (key && !value) {
				if ( typeof key === "object" && typeof key !== "string" ) {
					var arr = Object.keys(key);
					if (typeof arr[0] === "string" && typeof arr[1] === "string")  {
						this.keys[arr[0]] = arr[1];
					}
				}
			}
		}
		else {
			throw new Error("languageCode need to be set when adding a new key!");
		}
	}

	isArray(a) {
		if( Object.prototype.toString.call( a ) === '[object Array]' ) {
		    return true;
		}
		return false;
	};

	_isFile(file) {
		if (typeof file === "string") {
			if (fs.existsSync(path.resolve(file))) {
				return true;
			}
				throw new Error("Given file doesn't exists: '" + file + "'");
		}
		throw new Error("Given filepath is not a string: '" + file + "'");
	}

	get(key) {
		if(this.languageCode in this.keys) {
			let language = this.keys[this.languageCode]
			if(key in language) {
				return language[key];
			}
			throw new Error("Key '" + key + "' not found in language '" + this.languageCode + "'");
		}
		throw new Error("No such languagecode found: " + this.languageCode);

	}

	setLanguageCode(code) {
		this.languageCode = code;
	}

	print() {
		console.log(this.keys);
	}



}
