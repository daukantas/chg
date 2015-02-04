/*
 * grunt-chg
 * https://github.com/heff/chg
 *
 * Copyright (c) 2014 heff
 * Licensed under the MIT license.
 */

'use strict';

var commands = require('../lib/commands.js');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  function getCallback(done) {
    return function(err, success){
      if (err) {
        grunt.log.error(err.message);
        return done(false);
      }
      grunt.log.writeln(success);
      done(true);
    }
  }

  grunt.registerTask('chg-init', 'Create the CHANGELOG.md file', function() {
    var done =  this.async();
    commands.init({}, getCallback(done));
  });

  grunt.registerTask('chg-add', 'Add a line to the changelog', function(line) {
    var done =  this.async();
    commands.add(line, {}, getCallback(done));
  });

  grunt.registerTask('chg-release', 'Add a new release and move unrleased changes under it', function(version) {
    var done =  this.async();
    commands.release(version, {}, function(err, release) {
      if (err) {
        grunt.log.error(err.message);
        done(false);
      }

      grunt.config.set('chg.release.title', release.title);
      grunt.config.set('chg.release.changes', release.changes);
    });
  });

  grunt.registerTask('chg-delete', 'Delete the changelog', function() {
    var done =  this.async();
    commands.delete({}, getCallback(done));
  });
};
