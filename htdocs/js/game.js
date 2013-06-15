function Game() {
  this.mainword = '';
  this.timer = 0;
  this.score = 0;
  this.lettersWeights = null;
  this.correctAnswers = [];
  
  this.level = 1;
  this.achievScore = 0;
  this.maxAchievScore = 0;
  this.achievMultiplicator = 5;
  
  this.rareLetters = [];

  this.maxLevel = 50;
  
  this.userId = 0;
  this.userName = '';
  this.isFirst = false;
  
  this.lang = lang;
  
  this.used = {
    rareLetters: 0,
    shortWords: 0,
    longWords: 0,
    palindrome: 0,
    anagram: 0,
    expensiveWords: 0
  }
  
  this.isNewGame = function() {
    var strGameState = localStorage.getItem('wordGame');
    return strGameState == null || strGameState == "" || strGameState == 'null';
  }
  
  this.play = function() {
    if (this.isNewGame()) {
      this.getLanguage('completeSetup');
    } else {
      this.load();
    }
  }
  
  this.getLanguage = function(callback) {
    var game = this;
    $.getScript('js/game.language.' + game.lang + '.js', function() {
      game[callback].call(game);
    });
    return this;
  }
  
  this.completeSetup = function() {
    log('play begins');
    
    if (this.isNewGame()) {
      $('#modal').modal({keyboard: false});
    } else {
      this.populateUser();
    }
    
    this.localize();
    this.initControls();
    this.drawEmpty();
    this.populateTimer();
    this.addScore(0);
    graphic.updateLevelBar(this.level, this.score, this.maxLevel, this.nextLevel);
    this.updateLevel();          
  }
  
  
  this.localize = function() {
    $('[data-t]').each(function() {
      var key = $(this).attr('data-t');
      $(this).text(t[key]);
    });

    $('#showMenu').attr('title', t.menu);
    $('#new').text(t.snew);    
    $('#scores').text(t.scores);    
    $('#save').text(t.save);    
    $('#load').text(t.load);    
    $('#username-label').text(t.username);
    $('#achiev').text(t.achievements);
  }
  
  
  this.initControls = function() {
    var thisClass = this;    
    $('#answer').unbind().keyup(function(e) {
      thisClass.handleEvents(e);
    });
    
    $('#enter').unbind().click(function() {
      var press = jQuery.Event("keyup");
      press.ctrlKey = false;
      press.which = 13;
      press.keyCode = 13;
      $("#answer").trigger(press);
    });
    
    $('.box').on('click', '.letter', function() {
      var $letterElement = $(this);
      var letter = $letterElement.text().firstChar();
      var partWord = $("#answer").val();
      var word = partWord + letter;
      
      if ($letterElement.hasClass('selected')) {
        $letterElement.removeClass('selected');
        word = $("#answer").val().replace(letter, '');
      } else {
        $letterElement.addClass('selected');
      }
     
      $("#answer").val(word);
      $("#answer").focus();
      
      var press = jQuery.Event("keyup");

      //$("#answer").trigger(press);
    });
    
    $('#showMenu')
    .unbind()
    .click(function() {
      $('#menu').toggle();
      return false;
    });
    
    $('#new')
    .unbind()
    .click(function() {
      thisClass.reset();
      $('#menu').hide();
    });
    
    $('#scores')
    .unbind()
    .click(function(e) {
      request.get({r: 'user/get-scores'}, function(data) {
        thisClass.showScores(data);
        $('#menu').hide();
        e.preventDefault();
      });
    });
    
    $('#save')
    .unbind()
    .click(function() {
      thisClass.save();
      $('#menu').hide();
    });
    
    $('#load')
     .unbind()
     .click(function() {
      thisClass.load();
      $('#menu').hide();
    });
    
    $('#achiev')
    .unbind()
    .click(function(e) {
      thisClass.showAchievements();
      $('#menu').hide();
      e.preventDefault();
    });
    
    $('.close').on('click', function(e) {
      $(this).parent().hide();
      e.preventDefault();
    });
    
    $('body').on('click', '.add-word', function(e) {
      thisClass.addWord($('.add-word-container strong').text());
      e.preventDefault();
    });
    
     $('.add-word-close').on('click', function(e) {
      $('#message').fadeOut();
      e.preventDefault();
    });
    
    $('#sort-a').toggle(function() {
      thisClass.correctAnswers.sortA().reverse();
      thisClass.populateAnswers();
    },function() {
      thisClass.correctAnswers.sortA();
      thisClass.populateAnswers();
    });
    
    $('#sort-l').toggle(function() {
      thisClass.correctAnswers.sortL().reverse();
      thisClass.populateAnswers();
    },function() {
      thisClass.correctAnswers.sortL();
      thisClass.populateAnswers();
    });
    
    $('#sort-s').toggle(function() {
      thisClass.correctAnswers.sortS().reverse();
      thisClass.populateAnswers();
    },function() {
      thisClass.correctAnswers.sortS();
      thisClass.populateAnswers();
    });
    
    $('.lang[id="lang-' + this.lang + '"]').addClass('selected');
    
    $('.lang').unbind().click(function(e) {
      $('.lang').removeClass('selected');
      $(this).addClass('selected');
      thisClass.lang = $(this).attr('data-lang');
      thisClass.play();
      e.preventDefault();
    });
    
    $('#username-enter').unbind().click(function() {
      return thisClass.enterUsername();
    });
    
    $('#username').unbind().keyup(function(e) {
      if (e.keyCode == 13) {
        $("#username-enter").click();
      }
    });
  }
  
  this.initAchievements = function() {
    this.maxAchievScore = 0;
    // clone
    var tmpAchievements = clone(this.achievements);
    
    for (var i = 0; i < tmpAchievements.length; i++) {
      var ach = tmpAchievements[i];
      
      if (typeof ach.locale != 'undefined' && ach.locale != this.lang) {
        tmpAchievements.splice(i, 1);
        continue;
      }
      
      var achievParam = '';
      //log(ach.n + ': ' + typeof t[ach.n + '_d']);
      var description = description = t[ach.n + '_d'].format(ach.p);
      
      if (ach.n.contains(['score','time','level','words'])) {
        achievParam = ach.p;
      }
      
      ach.header = t[ach.n + achievParam + '_h'];
      ach.description = description;
      ach.fn = this[ach.n];
      ach.isCompleted = ach.isCompleted || false;
      ach.date = null;
      
      tmpAchievements[i] = ach;
      this.maxAchievScore += ach.s;
    }
    this.achievements = tmpAchievements;
  }
  
  this.initRareLetters = function() {
    this.rareLetters = [];
    for (var letter in this.lettersWeights) { 
      if (this.lettersWeights[letter] == maxLetterWeight) {
        this.rareLetters.push(letter);
      }
    }
  }
  
  this.getMainword = function() {
    var mainWordsArr = mainwords[this.lang].split(',');
    
    var mainWordsLen = mainWordsArr.length;
    var idx = Math.floor(Math.random() * mainWordsLen);
    this.mainword = mainWordsArr[idx];
    return this.mainword; 
  }
  
  this.getLetterWeight = function(letter) {
    if (this.lettersWeights == null) {
      this.fillLettersWeights();
    }
    return this.lettersWeights[letter];
  }
  
  this.fillLettersWeights = function() {
    // clone  
    this.lettersWeights = $.extend(true, {}, letterFrequency[this.lang]);
    
    var maxPercent = 0;
    for (var letter in this.lettersWeights) {
      var rawWeight = this.lettersWeights[letter];
      if (rawWeight > maxPercent) {
        maxPercent = rawWeight;
      }
    }
    
    for (var letter in this.lettersWeights) {
      var rawWeight = this.lettersWeights[letter];
      var weight = rawWeight / maxPercent;
      this.lettersWeights[letter] = maxLetterWeight - Math.ceil(maxLetterWeight * weight) + 1;
    }
  }
  
  this.populateUser = function() {
    $('#user').text(t.hallo + ' ' + this.userName);
  }
  
  this.isPalindrome = function(word) {
    return word.length > 4 && this.correctAnswers.containsWord(word.reverse());
  }
  
  this.isAnagram = function(word) {
    if (this.correctAnswers.length < 2) {
      return false;
    }
    if (this.isPalindrome(word)) {
      return false;
    }

    if (word.length < 5) {
      return;
    }
    
    var isAnagram = true;
    var len = this.correctAnswers.length;
    for (var i = 0; i < len; i++) {
      isAnagram = true;
      
      var wordLetters = word.split(''); 
      var wordLen = word.length;
      var currentAnswer = this.correctAnswers[i].w;
      
      if (wordLen != currentAnswer.length || currentAnswer == word) {
        isAnagram = false;
        continue;
      }
      
      var availableLetters = currentAnswer.split('');
      for (var j = 0; j < wordLen; j++) {
        var letter = wordLetters[j];
        if (!availableLetters.contains(letter)) {
          isAnagram = false;
          continue;
        }
        
        var idx = availableLetters.indexOf(letter);
        if (idx == -1) {
          isAnagram = false;
          continue;
        }
        availableLetters.splice(idx, 1);
      }
      
      return isAnagram;
    }
  }
  
  this.isExpensive = function(word) {
    return this.getScore(word) >= 50;
  }
  
  this.isCorrectWord = function(answer) {
    var mainLetters = this.mainword.split('');
    var answerLetters = answer.split('');
    var answerLettersLen = answerLetters.length; 
    var score = this.getScore(answer);
        
    if (answer.length < minWordLen) {
      return this.error(t.min_word_length.format(minWordLen));
    }
    
    if (this.mainword == answer) {
      return this.error(t.already_used.format(answer.strong()));
    }
    
    if (score < minScore) {
      return this.error(t.min_score.format(minScore));
    }
    
    if (this.correctAnswers.containsWord(answer)) {
      return this.error(t.already_used.format(answer.strong()));
    }
    
    var availableLetters = this.mainword.split('');
    for (var i = 0; i < answerLettersLen; i++) {
      var letter = answerLetters[i];
      if (!availableLetters.contains(letter)) {
        return this.error(t.cannot_make.format(answer.strong(), this.mainword.strong()));
      }
      
      var idx = availableLetters.indexOf(letter);
      if (idx == -1) {
        return this.error(t.cannot_make.format(answer.strong(), this.mainword.strong()));
      }
      availableLetters.splice(idx, 1);
    }
    return true;
  }
  
  this.ask = function(word) {
    if (!this.isCorrectWord(word)) {
      return false;
    }
    
    var game = this;
    request.get({r: 'dictionary/try', word: word}, function(data) {
      if (data.isAllowed) {
        return game.tryAnswer(data.word);
      } else {
        return game.errorAddWord(t.unknown_word.format(word.strong()));
      }
    });
  }
  
  this.tryAnswer = function(word) {
    if (this.isCorrectWord(word)) {
      var score = this.getScore(word);
      var countLetters = word.length;
      var $answerRow = $('<tr><td>' + word + '</td><td>' + countLetters + '</td><td>' + score + '</td></tr>');
      $('#answerContainer table').prepend($answerRow);
      
      this.addScore(score);
      graphic.updateLevelBar(this.level, this.score, this.maxLevel, this.nextLevel);
      this.updateLevel();
      
      if (this.isPalindrome(word)) {
        this.used.palindrome++;
      }
      if (this.isAnagram(word)) {
        this.used.anagram++;
      }
      
      if (word.length < 4) {
        this.used.shortWords++;
      }
      
      if (word.length > 6) {
        this.used.longWords++;
      }
      
      if (word.containsRare()) {
        this.used.rareLetters++;
      }
      
       if (this.isExpensive(word)) {
        this.used.expensiveWords++;
      }
      
      var answer = {w: word, s: score};      
      this.correctAnswers.push(answer);
      
      this.updateWords();
      
      this.checkAchievements(word);
      
      this.save();
      
      $('.letter').removeClass('selected');
      $('#answerLetters').empty();
      $('#answer').val('');
      $('#answer').focus();
    }
  }
  
  this.getScore = function(word) {
    var score = 0;
    var letters = word.split('');
    var lettersLen = letters.length;
    for (var i = 0; i < lettersLen; i++) {
      var letter = letters[i];
      score += this.getLetterWeight(letter);
    }
    return score;
  }
  
  this.addScore = function(score) {
    this.score = parseInt(this.score + score);
    $('#score').text(t.score + ': ' + this.score);
    
    request.get({r: 'user/set-score', score: this.score}, function(data) {
      this.isFirst = data != null && data.isFirst;
    });
  }
  
  this.updateLevel= function() {
    if (this.level >= this.maxLevel) {
      return false;
    }
    $('#level').text(t.level + ': ' + this.level);
  }
  
  this.updateWords = function() {
    $('#words').text(t.words + ': ' + this.correctAnswers.length);
  }
  
  this.nextLevel = function() {
    if (this.level >= this.maxLevel) {
      return false;
    }
    this.level++;
    this.getMainword();
    this.draw();
  }
  
  this.populateTimer = function() {
    $('#timer').text(t.time + ': ' + this.timer.formatTime());
  }
  
  this.setTimer = function() {
    this.populateTimer();
    this.timer++;
    var thisClass = this;
    setTimeout(function(){thisClass.setTimer()}, 1000);
    this.checkAchievements({type: 'time'});
  }
  
  this.checkAchievements = function(arg) {
    var type = '';
    var word = '';
    if (typeof(arg) === 'object') {
      type = arg.type;
    } else {
      word = arg;
    }
    var len = this.achievements.length;
    for (var i = 0; i < len; i++) {
      var achievement = this.achievements[i];
            
      var header = achievement.header + ' +' + achievement.s;
      
      var fn = achievement.fn;
      var regExp = new RegExp(type);
      if (type && !regExp.test(achievement.n)) {
        continue;
      }
      if (typeof fn != 'function') {
        continue;
      }
      
      if (!achievement.isCompleted && fn.apply(this, [word, achievement.p])) {
        
        graphic.message(achievement.header, achievement.description, 'achievement');
        
        achievement.isCompleted = true;
        achievement.date = new Date();
        this.achievScore += achievement.s;
        var score = achievement.s * this.achievMultiplicator * this.level;
        this.addScore(score);
        graphic.updateLevelBar(this.level, this.score, this.maxLevel, this.nextLevel);
        this.updateLevel();
        this.updateWords();
        log('achiev ' + score);
      }
    }
  }
  
  this.drawEmpty = function() {
    var $mainContainer = $('.box');
    $mainContainer.empty();
    for (var i = 0; i < 9; i++) {
      var letter = 'х';
      var weight = 6;
      
      var $weight = $('<div>')
        .attr('class', 'weight w' + weight)
        .text(weight);
        
      
      $('<div>').attr({
        'class': 'letter' 
      })
      .text(letter)
      .append($weight)
      .appendTo($mainContainer);
    }
    $mainContainer.append('<div class="clear" />');
  }
  
  this.draw = function(){
    var mainLetters = this.mainword.split('');
    var mainLettersLen = mainLetters.length;
    var $mainContainer = $('.box');
    $mainContainer.empty();
    
    for (var i = 0; i < mainLettersLen; i++) {
      var letter = mainLetters[i];
      var weight = this.getLetterWeight(letter);
      
      var $weight = $('<div>')
        .attr('class', 'weight w' + weight)
        .text(weight);
        
      
      $('<div>').attr({
        'class': 'letter' 
      })
      .text(letter)
      .append($weight)
      .appendTo($mainContainer);
    }
    $mainContainer.append('<div class="clear" />');
  }
  
  this.updatePossibleScore = function() {
    var possibleScore = this.getScore($('#answer').val());
    $('#possibleScore').text(possibleScore);
  }
  
  this.handleEvents = function(e) {
    switch (e.keyCode) {
      /* ENTER */
      case 13:
        if (!$('#answer').val()) {
          return false;
        }
        graphic.animateAnswer();
        this.ask($('#answer').val());
        e.preventDefault();
        break;
        /*ESC */
      case 27:
        $('#answerLetters').empty();
        $('#answer').val('');
        $('.letter').removeClass('selected');
        e.preventDefault();
        break;
        /* BASKSPACE */
      case 8:
        this.animateLetters();
        e.preventDefault();
        break;
      default:
        this.animateLetters();
        break;
    }
  }
  
  this.animateLetters = function() {
    var word = $('#answer').val();
    $('.letter').removeClass('selected');        
    
    for (var i = 0; i < word.length; i++) {
      var letter = word[i];
      var $letterElement = $(".letter:contains('" + letter + "'):not('.selected'):first");
      $letterElement.addClass('selected');
    }
  }
  
  
  this.error = function(message) {
    graphic.message(t.error, message, '');
    return false;
  }
  
  
  this.errorAddWord = function(message) {
    message = '<div class="add-word-container">' + message + '</div>';
    message += ' <a href="#" class="add-word">' + t.add_word + '</a>';
    graphic.message(t.error, message, '', 10000000);
    return false;
  }
  
  
  this.addWord = function(word) {
    var game = this;
    
    request.get({r: 'dictionary/add-word', word: word, userId: game.userId}, function(data) {
        if (data.success) {
          game.tryAnswer(data.word);
          $('.jGrowl-close').click();
          graphic.message(t.message, t.word_added.format(word.strong()), '');
        }
    });
  }
  
  
  this.showAchievements = function() {
    var header = t.achievements + ' ' + this.achievScore + ' / ' + this.maxAchievScore;
    var achievementsContent = '';
    
    this.achievements = this.achievements.sortC();
    var len = this.achievements.length;
    for (var i = 0; i < len; i++) {
      var a = this.achievements[i];
      if (typeof(a.date) == 'string') {
        a.date = new Date(a.date);
      }
      
      var iconName = a.n;
      if (typeof a.p != 'undefined') {
        iconName += a.p;
      }
      var iconStyle = 'background-image: url(img/achievements/' + iconName + '.png)';
      var completedClass = a.isCompleted ? ' completed ' : '';
      var item = '<div class="ach-item ' + completedClass + '">'
      + '<div class="icon" style="' + iconStyle + '"></div>'
      + '<div class="header">' + a.header + '</div>'
      + '<div class="description">' + a.description + '</div>'
      + '<div class="score"><div class="value">' + a.s + '</div>';
      
      if (a.date != null) {
        item += '<div class="date">' + a.date.format() + '</div>';
      }
      item += '</div>'
      + '</div>';
      
      achievementsContent += item;        
    }
    
    graphic.getWindow($('#win-achievements'), header, achievementsContent);
  }
  
  
  this.showScores = function(scores) {
    var header = t.scores;
    var content = '';
    var len = scores.length;
    for (var i = 0; i < len; i++) {
      var scoreItem = scores [i];
      content += '<tr><td>' + (i + 1) + '.</td><td>' + scoreItem.name + '</td><td>' + scoreItem.score + '</td></tr>';
    }
    content = '<table>' + content + '</table>';
    graphic.getWindow($('#win-scores'), header, content);
  }
  
  
  this.save = function() {
    if (!isLocalStorageSupports()) {
      return false;
    }
    
    var gameState = {
      timer: this.timer,
      level: this.level,
      score: this.score,
      correctAnswers: this.correctAnswers,
      achievScore: this.achievScore,
      achievements: this.achievements,
      used: this.used,
      userId: this.userId,
      userName: this.userName,
      lang: this.lang
    };
    
    localStorage.setItem('wordGame', JSON.stringify(gameState));
  }
  
  
  this.load = function() {  
    var strGameState = localStorage.getItem('wordGame');
    var gameState = JSON.parse(strGameState, function (key, value) {
      if (key == 'date' && value != null) {
        value = value.fromIsoDate();
      }
      return value;
    });
    
    this.timer = gameState.timer;
    this.level = gameState.level;
    this.score = gameState.score;
    this.correctAnswers = gameState.correctAnswers;
    this.achievScore = gameState.achievScore;
    this.achievements = gameState.achievements;
    this.used = gameState.used;
    this.userId = gameState.userId;
    this.userName = gameState.userName;
    this.lang = gameState.lang;
    
    this.getLanguage('completeLoad');
  }
  
  this.completeLoad = function() {
    this.localize();
    
    this.fillLettersWeights();
    this.initRareLetters();
    this.initAchievements();
    this.populateAnswers();
    this.populateUser();
    
    this.addScore(0);
    graphic.updateLevelBar(this.level, this.score, this.maxLevel, this.nextLevel);
    this.updateLevel();
    this.updateWords();
    this.initControls();
    
    this.getMainword();
    this.fillLettersWeights();
    this.draw();
    this.populateTimer();
    this.updateWords();
    this.setTimer();
  }
  
  
  this.reset = function() {
    localStorage.setItem('wordGame', null);
    request.get({r: 'user/reset'}, function() {
      window.location.reload();
    });
  }
  
  
  this.enterUsername = function() {
    var game = this;
    var username = $('#username').val();
    
    if(!username) {
      return;
    }
    
    request.get({r: 'user/enter-username', username: username}, function(data) {
        if (data.success) {
          game.userId = data.userId;
          game.userName = data.userName;
          game.getMainword();
          game.fillLettersWeights();
          game.initAchievements();          
          game.initRareLetters();

          game.draw();
          game.populateUser();
          game.save();
          $('#modal').modal('hide');
          game.setTimer();
        }
    });
  }
  
  
  this.populateAnswers = function() {
    $('#answerContainer table tbody').empty();
    
    for (var i = 0; i < this.correctAnswers.length; i++) {
      var answer = this.correctAnswers[i];
      var $answerRow = $('<tr><td>' + answer.w
        + '</td><td>' + answer.w.length
        + '</td><td>' + answer.s + '</td></tr>');
      $('#answerContainer table tbody').prepend($answerRow);
    }
  }
}