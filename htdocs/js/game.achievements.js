Game.prototype.achievements = [
  {n: 'rareLetter', s: 10},
  {n: 'longWord', s: 15},
  {n: 'palindrome', s: 15},
  {n: 'anagram', s: 10},
  {n: 'expensiveWord', s: 10},
  {n: 'note7', s: 10, locale: 'ru'},
  {n: 'rainbow', s: 20, locale: 'ru'},
  {n: 'minimalist', s: 10},
  {n: 'first', s: 10},
  
  {n: 'scores', s: 10, p: 500},
  {n: 'scores', s: 15, p: 1000},
  {n: 'scores', s: 20, p: 5000},
  {n: 'scores', s: 30, p: 10000},
  {n: 'scores', s: 40, p: 50000},
  {n: 'scores', s: 50, p: 100000},
  {n: 'scores', s: 70, p: 500000},
  {n: 'scores', s: 100, p: 1000000},
  
  {n: 'levels', s: 10, p: 2},
  {n: 'levels', s: 10, p: 5},
  {n: 'levels', s: 10, p: 10},
  {n: 'levels', s: 20, p: 20},
  {n: 'levels', s: 25, p: 30},
  {n: 'levels', s: 30, p: 40},
  {n: 'levels', s: 35, p: 50},
  
  {n: 'words', s: 10, p: 20},
  {n: 'words', s: 10, p: 50},
  {n: 'words', s: 15, p: 100},
  {n: 'words', s: 20, p: 500},
  {n: 'words', s: 30, p: 1000},
  
  {n: 'times', s: 10, p: 10},
  {n: 'times', s: 10, p: 30},
  {n: 'times', s: 10, p: 60},
  {n: 'times', s: 20, p: 5*60},
  {n: 'times', s: 30, p: 10*60},
  
  {n: 'shortWordsMaster', s: 15, p: 10},
  {n: 'rareLettersMaster', s: 20, p: 10},
  {n: 'longWordsMaster', s: 20, p: 10},
  {n: 'palindromeMaster', s: 20, p: 10},
  {n: 'anagramMaster', s: 20, p: 10},
  {n: 'expensiveWordsMaster', s: 20, p: 10},
  {n: 'masterOfUniverse', s: 200, p: 10},
  
];
  
Game.prototype.scores = function(word, score) {
  return this.score >= score;
}

Game.prototype.levels = function(word, level) {
  return this.level >= level;
}

Game.prototype.words = function(word, words) {
  return this.correctAnswers.length >= words;
}

Game.prototype.times = function(word, time) {
  return this.timer >= time * 60;
}



Game.prototype.longWord = function(word) {
  if (word.length >= 7) {
    this.used.longWords++;
    return true;
  }
  return false;
}

Game.prototype.expensiveWord = function(word) {
  return this.isExpensive(word);
}

Game.prototype.rareLetter = function(word) {
  return word.containsRare();
}

Game.prototype.palindrome = function(word) {
  return this.isPalindrome(word);
}

Game.prototype.anagram = function(word) {
  return this.isAnagram(word);
}

Game.prototype.note7 = function() {
  var notes = ['до','ре','ми','фа','соль','ля','си'];
  
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    if (!this.correctAnswers.containsWord(note)) {
      return false;
    }
  }
  return true;
}

Game.prototype.rainbow = function() {
  var letters = ['к','о','ж','з','г','с','ф'];
  var countLetters = 0;
  lettersLoop:
  for (var i = 0; i < letters.length; i++) {
    var letter = letters[i];
    for (var j = 0; j < this.correctAnswers.length; j++) {
      var answer = this.correctAnswers[j].w;
      if (answer.firstChar() == letter) {
        countLetters++;
        continue lettersLoop;
      }
    }
  }
  return countLetters == letters.length;
}

Game.prototype.minimalist = function(word) {
  return this.getScore(word) == minScore;
}

Game.prototype.first = function(word) {
  return this.isFirst;
}



Game.prototype.shortWordsMaster = function(word) {
  return this.used.shortWords == 10;
}

Game.prototype.rareLettersMaster = function(word) {
  return this.used.rareLetters == 10;
}

Game.prototype.longWordsMaster = function(word) {
  return this.used.longWords == 10;
}

Game.prototype.palindromeMaster = function(word) {
  return this.used.palindrome == 10;
}

Game.prototype.anagramMaster = function(word) {
  return this.used.anagram == 10;
}

Game.prototype.expensiveWordsMaster = function(word) {
  return this.used.expensiveWords == 10;
}

Game.prototype.masterOfUniverse = function(word) {
  return this.achievScore == this.maxAchievScore;
}