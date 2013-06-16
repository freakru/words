module('updateLevelBar', {
  setup: function() {
    var $fixture = $('#qunit-fixture');
    var $levelBar = $fixture.append('<div id="level-bar"><div class="level-chunk"></div></div>');
  },

  teardown: function() {
    
  }
});


test( "simple", function() {
  
  var $fixture = $('#qunit-fixture');
  equal( $( "#level-bar", $fixture ).width(), 570, "level-bar added successfully!" );
});
 
test( "level 1", function() {
  var $fixture = $('#qunit-fixture');
  var $bar = $('#level-bar .level-chunk');
  var graphic = new Graphic();

  graphic.updateLevelBar(1, 0, 50);

  equal( $bar.width(), 0, "right width is 0" );
});

test( "level 1 score 100", function() {
  var $fixture = $('#qunit-fixture');
  var $bar = $('#level-bar .level-chunk');
  var graphic = new Graphic();

  graphic.updateLevelBar(1, 100, 50);

  equal( $bar.width(), 100, "right width is 100" );
});


test( "level 1 score 490", function() {
  var $fixture = $('#qunit-fixture');
  var $bar = $('#level-bar .level-chunk');
  var graphic = new Graphic();

  graphic.updateLevelBar(1, 490, 50);

  equal( $bar.width(), 490, "right width is 490" );
});

test( "level 2 score 680", function() {
  var $fixture = $('#qunit-fixture');
  var $bar = $('#level-bar .level-chunk');
  var graphic = new Graphic();

  graphic.updateLevelBar(2, 680, 50);

  equal( $bar.width(), 340, "right width is 340" );
});