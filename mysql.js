"use strict";
const mysql = require('mysql2');
module.exports = class MySQL {

	constructor(details) {
		this.connection = undefined;
		this.query = 'SELECT value FROM language_data WHERE keyid = (SELECT id FROM language_key WHERE langkey = ?) AND codeid = (SELECT id FROM language_code WHERE code = ?) LIMIT 1';
		if (details) {
			this.details = details;
			this.connect(details);
			if(details.query)
				this.query = details.query;

		}

	}
	get(key, languageCode, callback) {
		// execute will internally call prepare and query
		if (this.details.query) {
			this.query = this.prepareQuery(this.details.query, languageCode, key);
		}
		this.connection.execute(this.query,[key, languageCode],
		  function(err, results, fields) {
			  if (err) {
			  	callback(err)
			  }
			  else {
				  callback(undefined, results[0].value); // results contains rows returned by server
			  }
		  }
		);

	}
	end() {
		this.connection.end();
	}

	prepareQuery(rawQuery, code, key) {
		return rawQuery.replace("$CODE", this.prepareString(code)).replace("$KEY", this.prepareString(key));
	}

	prepareString(str) {
		return "'" + str + "'";
	}

	connect(details) {
		this.connection = mysql.createConnection(details);
	}


}
