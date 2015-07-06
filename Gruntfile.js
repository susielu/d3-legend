
module.exports = function(grunt){

// configure plugins
grunt.initConfig({

  // CSS minification
  concat: {
    build: {
      src: ['src/legend.js', 'src/color.js', 'src/size.js', 'src/symbol.js'],
      dest: 'd3-legend-all.js'
    },

    color: {
      src: ['src/legend.js', 'src/color.js'],
      dest: 'd3-legend-color.js'
    },

    size: {
      src: ['src/legend.js', 'src/size.js'],
      dest: 'd3-legend-size.js'
    },

    symbol: {
      src: ['src/legend.js', 'src/symbol.js'],
      dest: 'd3-legend-symbol.js'
    }
  },

  // Uglify js for build
  uglify: {
    build: {
      files: {
        'd3-legend-all.min.js': 'd3-legend-all.js'
      }
    },

    color: {
      files: {
        'd3-legend-color.min.js': 'd3-legend-color.js'
      }
    },

    size: {
      files: {
        'd3-legend-size.min.js': 'd3-legend-size.js'
      }
    },

    symbol: {
      files: {
        'd3-legend-symbol.min.js': 'd3-legend-symbol.js'
      }
    }
  }

 });

  // Loading tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Registering tasks
  grunt.registerTask('default', ['concat', 'uglify']);

};