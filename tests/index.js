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
	});
});
