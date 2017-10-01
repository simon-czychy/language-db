const Core = require('../index');
var assert = require('assert');
describe('core', function() {

	describe('setup connection details', function() {
		describe('setup(connectionDetails)', function() {
			it('should set the value to given parameter', function() {
				let translate = new Core();
				translate.use("mysql");
				translate.setup({
					"host": "TESTHOST",
					"user": "TESTUSER",
					"password": "TESTPASS",
					"database": "TESTDB",
					"query": "TESTQUERY"
				});
				assert.deepEqual({
					"host": "TESTHOST",
					"user": "TESTUSER",
					"password": "TESTPASS",
					"database": "TESTDB",
					"query": "TESTQUERY"
				}, translate.getConnectionDetails());
			});
		});

		describe('setup(connectionDetails)', function() {
			it('should throw an error when no argument given', function() {
				let translate = new Core();
				translate.use("mysql");

				function setup(){
					translate.setup();
				}
				assert.throws( setup, Error );
			});
			it('should throw an error when argument not type of object', function() {
				let translate = new Core();
				translate.use("mysql");
				assert.throws( () => {
					translate.setup("TESTSTRING");
				},
					Error
				);

				assert.throws( () => {
					translate.setup([]);
				},
					Error
				);
				assert.throws( () => {
					translate.setup(1234567890);
				},
					Error
				);
				assert.throws( () => {
					translate.setup(function(){});
				},
					Error
				);
				assert.throws( () => {
					translate.setup(true);
				},
					Error
				);
				assert.throws( () => {
					translate.setup(false);
				},
					Error
				);
			});
		});
	});

	describe('languageCode', function() {
		describe('setLanguageCode(value)', function() {
			it('should set the value to given parameter', function() {
				let translate = new Core();
				translate.setLanguageCode("TEST");
				assert.equal("TEST", translate.getLanguageCode());
			});
		});
	});
	describe('engine', function() {
		describe('use(type)', function() {
			it('should set the value if available engine is given', function() {
				let translate = new Core();
				assert.deepEqual({"engine": "mysql"}, translate.use("mysql"));
			});
			it('should should throw an error if given engine is unsuporrted', function() {
				let translate = new Core();
				function use(){
					translate.use("mariadb")
				}
				assert.throws( use, Error );
			});
		});
		describe('getEngine()', function() {
			it('should return the engine which will be used', function() {
				let translate = new Core();
				translate.use("mysql")
				assert.deepEqual("mysql", translate.getEngine());
			});
			it('should return undefined if unsuporrted engine is given', function() {
				let translate = new Core();
				assert.deepEqual(undefined, translate.getEngine());
			});

		});
		describe('load(database)', function() {
			it('should add keys if given argument is a filepath that exists', function() {
				let translate = new Core("./tests/testdata.json");
				assert.deepEqual({
				    "en": {
				        "intro": "this is an intro text",
				        "content": "welcome to xyz page blabla"
				    }
				}
				, translate.getKeys());
			});
			it('should throw an error if given argument is a filepath that doesnt exists', function() {
				assert.throws( () => {
					new Core("FILETHATDOESNOTEXISTS")
				},
					Error
				);
			});
			it('should add keys if given argument is an array', function() {
				let translate = new Core(["./tests/testdata.json"]);
				assert.deepEqual({
					"en": {
						"intro": "this is an intro text",
						"content": "welcome to xyz page blabla"
					}
				}
				, translate.getKeys());
			});
			it('should should throw an error if empty array is given', function() {
				assert.throws( () => {
					new Core([])
				},
					Error
				);
			});
			it('should add keys if given argument is an object', function() {
				let translate = new Core({
					"en": {
						"intro": "this is an intro text",
						"content": "welcome to xyz page blabla"
					}
				});
				assert.deepEqual({
					"en": {
						"intro": "this is an intro text",
						"content": "welcome to xyz page blabla"
					}
				}
				, translate.getKeys());
			});
			it('should add keys if given argument is function', function() {
				assert.throws( () => {
					new Core(function(){})
				},
					Error
				);
			});
			it('should add keys if given argument is a number', function() {
				assert.throws( () => {
					new Core(123456789)
				},
					Error
				);
			});

		});
		describe('_isFile(filepath)', function() {
			it('should return true if file exists', function() {
				let translate = new Core();
				assert.deepEqual(true, translate._isFile("./tests/testdata.json"));
			});
			it('should thrown an error if does not exists', function() {
				let translate = new Core();
				assert.throws( () => {
					translate._isFile("FILETHATDOESNOTEXISTS")
				},
					Error
				);
			});
			it('should thrown an error if given param is not a string', function() {
				let translate = new Core();
				assert.throws( () => {
					translate._isFile(12345)
				},
					Error
				);
				assert.throws( () => {
					translate._isFile(function() {})
				},
					Error
				);
				assert.throws( () => {
					translate._isFile({})
				},
					Error
				);
				assert.throws( () => {
					translate._isFile(true)
				},
					Error
				);
				assert.throws( () => {
					translate._isFile([])
				},
					Error
				);
			});

		});
		describe('_isString(value)', function() {
			it('should return true if value is a string', function() {
				let translate = new Core();
				assert.deepEqual(true, translate._isString("STRING"));
			});
			it('should return true if value is a string', function() {
				let translate = new Core();
				assert.deepEqual(false, translate._isString(123456789));
				assert.deepEqual(false, translate._isString([]));
				assert.deepEqual(false, translate._isString({}));
				assert.deepEqual(false, translate._isString(function() {}));
				assert.deepEqual(false, translate._isString(true));
			});
			it('should thrown an error if given param is not a string', function() {
				let translate = new Core();
				assert.throws( () => {
					translate._isFile(12345)
				},
					Error
				);
				assert.throws( () => {
					translate._isFile(function() {})
				},
					Error
				);
				assert.throws( () => {
					translate._isFile({})
				},
					Error
				);
				assert.throws( () => {
					translate._isFile(true)
				},
					Error
				);
				assert.throws( () => {
					translate._isFile([])
				},
					Error
				);
			});

		});
		describe('add(language, key , value)', function() {
			it('should thorw an error if a database is used', function() {
				let translate = new Core();
				translate.use("mysql")
				assert.throws( () => {
					translate.add("TESTLANGUAGE", { "TESTKEY": "TESTVALUE" })
				},
					Error
				);
			});
			it('should thorw an error if no languagecode given', function() {
				let translate = new Core();
				assert.throws( () => {
					translate.add(undefined, { "TESTKEY": "TESTVALUE" })
				},
					Error
				);
				assert.throws( () => {
					translate.add({ "TESTKEY": "TESTVALUE" })
				},
					Error
				);
				assert.throws( () => {
					translate.add(function() {})
				},
					Error
				);
				assert.throws( () => {
					translate.add([])
				},
					Error
				);
				assert.throws( () => {
					translate.add(123456789)
				},
					Error
				);
			});
			it('should thorw an error if key and/or value undefined', function() {
				let translate = new Core({"TESTLANGUAGE": {"TESTKEY": "TESTVALUE"}});
				assert.throws( () => {
					translate.add("TESTLANGUAGE")
				},
					Error
				);
			});
			it('should thorw an error if key and/or value undefined as object', function() {
				let translate = new Core();
				assert.throws( () => {
					translate.add("TESTLANGUAGE", {}, undefined)
				},
					Error
				);
			});
			it('should thorw an error if key is an object and value is defined', function() {
				let translate = new Core();
				assert.throws( () => {
					translate.add("TESTLANGUAGE", {}, 1)
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", {}, true)
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", {}, [])
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", {}, {})
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", {}, function() {})
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", {}, "")
				},
					Error
				);
			});
			it('should thorw an error if value not passed and key not an object', function() {
				let translate = new Core();
				assert.throws( () => {
					translate.add("TESTLANGUAGE", function(){})
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", 123)
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", [])
				},
					Error
				);
				assert.throws( () => {
					translate.add("TESTLANGUAGE", true)
				},
					Error
				);
			});
			it('should thorw an error if given languagecode key or value is not string', function() {
				let translate = new Core();
				assert.throws( () => {
					translate.add(1, { "text": "this is not the intro text, and has been overriden" })
				},
					Error
				);
				assert.throws( () => {
					translate.add(function () {} , { "TESTKEY" : "TESTVALUE" })
				},
					Error
				);
				assert.throws( () => {
					translate.add([] , { "TESTKEY" : "TESTVALUE" })
				},
					Error
				);
				assert.throws( () => {
					translate.add(true , { "TESTKEY" : "TESTVALUE" })
				},
					Error
				);
				assert.throws( () => {
					translate.add({} , { "TESTKEY" : "TESTVALUE" })
				},
					Error
				);
			});
			it('should add the key if languagecode key and value is given', function() {
				let translate = new Core({"TESTLANGUAGE": { "TESTKEY": "TESTVALUE" }});
				translate.add("TESTLANGUAGE", { "TESTKEY2": "TESTVALUE2" })
				assert.deepEqual({"TESTLANGUAGE": { "TESTKEY": "TESTVALUE", "TESTKEY2": "TESTVALUE2" }}, translate.getKeys());
			});

		});
		describe('_addKey(code, key, value)', function() {
			it('should add the key if all parameters are string', function() {
				let translate = new Core({"TESTLANGUAGE": { "TESTKEY": "TESTVALUE" }});
				translate._addkey("TESTLANGUAGE", "TESTKEY2", "TESTVALUE2");
				assert.deepEqual({"TESTLANGUAGE": { "TESTKEY": "TESTVALUE", "TESTKEY2": "TESTVALUE2" }}, translate.getKeys());
			});
			it('should throow an error if argumnets are not a string', function() {
				let translate = new Core({"TESTLANGUAGE": { "TESTKEY": "TESTVALUE" }});

				assert.throws( () => {
					translate._addkey("TESTLANGUAGE", 1, function() {});
				},
					Error
				);
				assert.throws( () => {
					translate._addkey({}, [], true);
				},
					Error
				);
				assert.throws( () => {
					translate._addkey("TEST", "TEST", true);
				},
					Error
				);
				assert.throws( () => {
					translate._addkey("TEST", "TEST", false);
				},
					Error
				);
			});
		});
	});

});
