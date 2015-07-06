
module.exports = function(grunt){

// configure plugins
grunt.initConfig({

  // CSS minification
  concat: {
    build: {
      src: ['src/legend.js', 'src/color.js', 'src/size.js', 'src/symbol.js'],
      dest: 'd3-legend.js'
    }
  },

  // Uglify js for build
  uglify: {
    build: {
      files: {
        'd3-legend.min.js': 'd3-legend.js'
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