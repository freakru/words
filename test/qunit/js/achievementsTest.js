module('achievements', {
  setup: function() {
    var $fixture = $('#qunit-fixture');
  },
  teardown: function() {
    
  }
});

test('no rainbow', function() {
  var game = new Game('ru');
  
  game.correctAnswers = [{w:'красный'},{w:'красный'},{w:'красный'},
    {w:'красный'},{w:'красный'},{w:'красный'},{w:'красный'}];
  equal(game.rainbow(), false);
});

test('rainbow', function() {
  var game = new Game('ru');
  
  game.correctAnswers = [{w:'красный'},{w:'оранжевый'},{w:'желтый'},
    {w:'зеленый'},{w:'голубой'},{w:'синий'},{w:'фиолетовый'}];
  equal(game.rainbow(), true);
});