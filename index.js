"use strict";

let KEY = require("./key");
let fs = require("fs");
let path = require("path");

module.exports = class LanguageDB {

	constructor(database) {
		this.keys = [];
		this.languageCode = "en";
		this.load(path.resolve(database));
	}

	load(database) {
		let values = require(database);
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
