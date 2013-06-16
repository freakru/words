function Graphic() {
  var self = this;

  self.getWindow = function($window, header, content) {    
    $('.modal-header h3', $window).html(header);
    $('.win-content', $window)
      .empty()
      .append(content)
      .show();
    $window.modal({keyboard: false});
  }

  self.message = function(header, description, theme, duration) {
    var life = 3000;
    if (typeof duration != 'undefined') {
      life = duration;
    }
    $.jGrowl(description, {
      header: header,
      theme: theme,
      life: life});
  }
  
  self.animateAnswer = function() {
    var oldBackground = $('#answer').css('background-color');
    var newBackground = '#fff';
    $('#answer').css('background-color', newBackground);
    setTimeout(function(){
      $('#answer').css('background-color', oldBackground);
    }, 200);
  }

  self.updateLevelBar = function(level, score, maxLevel, nextLevelCallback) {
    if (level >= maxLevel) {
      return false;
    }
    
    $levelBar = $('#level-bar .level-chunk');
    var maxLevelBarLen = $('#level-bar').width();
    var levelBarLen = score / level;
    
    if (levelBarLen > maxLevelBarLen) {
      levelBarLen -= maxLevelBarLen;
      if (typeof nextLevelCallback === 'function') {
        nextLevelCallback();
      }
    }

    $levelBar.css({width: levelBarLen + 'px'});
  }
  
} 