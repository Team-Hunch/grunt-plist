'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp']
    },

    plist: {
      bump_version: {
        options: {
          key: "CFBundleShortVersionString",
          value: "5"
        },
        files: {
          'test/tmp/sample-info-transformed': ['test/fixtures/sample-info.plist']
        }
      },
      bump_version_with_replace: {
        options: {
          key: "CFBundleShortVersionString",
          value: function(code) {
            var semver = require('semver');
            return semver.inc(code, 'minor');
          }
        },
        files: {
          'test/tmp/sample-info-with-replace-function-transformed': ['test/fixtures/sample-info.plist']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'plist', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
