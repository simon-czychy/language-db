"use strict";

let KEY = require("./key");
let fs = require("fs");
let path = require("path");

module.exports = class LanguageDB {

	constructor(database) {
		this.keys = [];
		this.load(path.resolve(database));
	}

	load(database) {
		let values = require(database);
		for(var key in values) {
			this.keys[key] = values[key];
		}
	}

	get(key) {
		if(key in this.keys)
			return this.keys[key];
		else
			return "No such key";
	}

}
