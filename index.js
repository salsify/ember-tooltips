'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    nodeAssets: {

      'popper.js': {
        vendor: {
          srcDir: 'dist/umd',
          destDir: 'popper',
          include: ['popper.js', 'popper.js.map'],
        },
      },

      'tooltip.js': {
        vendor: {
          srcDir: 'dist/umd',
          destDir: 'popper',
          include: ['tooltip.js', 'tooltip.js.map'],
        },
      },
    },
  },

  included: function(app) {
    this._super.included(app);

    app.import('vendor/popper/popper.js');
    app.import('vendor/popper/tooltip.js');
  },

};
