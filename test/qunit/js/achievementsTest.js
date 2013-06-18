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

test('longWord', function() {
  var game = new Game('ru');  
  equal(game.longWord('длинный'), true);
});

test('palindrome', function() {
  var game = new Game('ru');  
  game.correctAnswers = [{w:'алиса'}];  
  equal(game.palindrome('асила'), true);
});

test('no anagram: too less answers', function() {
  var game = new Game('ru');  
  game.correctAnswers = [{w:'алиса'}];  
  equal(game.anagram('лисаа'), false);
});

test('no anagram: palindrome', function() {
  var game = new Game('ru');  
  game.correctAnswers = [{w:'алиса'}];  
  equal(game.anagram('асила'), false);
});

test('no anagram: too small', function() {
  var game = new Game('ru');  
  game.correctAnswers = [{w:'алиса'},{w:'антон'}];  
  equal(game.anagram('ас'), false);
});

test('anagram', function() {
  var game = new Game('ru');  
  game.correctAnswers = [{w:'алиса'},{w:'антон'}];  
  equal(game.anagram('аслиа'), true);
});

test('note7', function() {
  var game = new Game('ru');  
  game.correctAnswers = [{w:'до'},{w:'ре'},{w:'ми'},{w:'фа'},{w:'соль'},{w:'ля'},{w:'си'}];  
  equal(game.note7(), true);
});