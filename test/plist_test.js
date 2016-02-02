'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.plist = {
  setUp: function(done) {
    done();
  },
  bump_version_with_plain_value: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/sample-info-transformed');
    var expected = grunt.file.read('test/expected/bumpversion.plist');

    test.equal(actual, expected, '');

    test.done();
  },

  with_replace_function: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/sample-info-with-replace-function-transformed');
    var expected = grunt.file.read('test/expected/bumpversion_withreplacefunction.plist');
    test.equal(actual, expected, '');

    test.done();
  },
};
