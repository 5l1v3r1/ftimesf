require.ensure(['splash-screen/dist/splash.min.css', 'splash-screen'], function(require) {
  require('splash-screen/dist/splash.min.css').use();
  require('splash-screen').Splash.enable('circular');
});

require.ensure([
  'less/main.less',
  'splash-screen',
  './Entrance',
], function(require) {
  require('less/main.less');

  var Entrance = require('./Entrance').default;
  (new Entrance()).run();
});
