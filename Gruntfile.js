
module.exports = function(grunt){

// configure plugins
grunt.initConfig({

  browserify: {
    dist: {
      files: {
        'd3-legend.js': ['src/web.js'],
      }
    }
  },

  // Uglify js for build
  uglify: {
    build: {
      files: {
        'd3-legend.min.js': 'd3-legend.js'
      }
    },
    docs: {
      files: {
        'docs/d3-legend.min.js': 'd3-legend.js'
      }
    }
  }

 });

  // Loading tasks
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Registering tasks
  grunt.registerTask('default', ['browserify', 'uglify']);

};