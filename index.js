"use strict";

let KEY = require("./key");
let fs = require("fs");
let path = require("path");

module.exports = class LanguageDB {

	constructor(database) {
		this.keys = [];
		this.languageCode = "en";
		this.load(database);
	}

	load(database) {
		let values = {};
		if (typeof database === "string") {
			values = require(path.resolve(database));
		}
		else if((typeof database === "object")) {
			values = database;
		}
		else {
			throw new Error("Could not load database. Given: " + database);
		}

		for(var key in values) {
			this.keys[key] = values[key];
		}
	}

	get(key) {
		if(this.languageCode in this.keys) {
			let language = this.keys[this.languageCode]
			if(key in language) {
				return language[key];
			}
			return "Key '" + key + "' not found in language '" + this.languageCode + "'";
		}
		return "No such languagecode found: " + this.languageCode;

	}

	setLanguageCode(code) {
		this.languageCode = code;
	}

}
