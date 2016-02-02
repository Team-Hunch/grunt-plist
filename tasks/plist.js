'use strict';

var plist = require('plist');
var fs = require('fs');

module.exports = function(grunt) {

  grunt.registerMultiTask('plist', 'Bump versions in plist file', function () {
    var options = this.options({
      key: '',
      value: ''
    });

    this.files.forEach((file) => onFile(file, options));
  });

  function onFile(f, options) {
    f.src
        .filter(function (filepath) {

          if (!grunt.file.exists(filepath)) {

            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        })
        .map(function (filepath) {

          var data = plist.parseFileSync(filepath);
          data[options.key] = (function () {
            if (typeof options.value === 'function') {

              return options.value(data[options.key]);
            }

            return options.value;
          })();

          var newPlistContent = plist.build(data, {
            indent: '\t',
            offset: -1
          });

          fs.writeFileSync(f.dest, newPlistContent + '\n');
        });
  }

};
