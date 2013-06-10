function Graphic() {
  this.getWindow = function($window, header, content) {    
    $('.win-header', $window).html(header);
    $('.win-content', $window)
      .empty()
      .append(content)
      .show();
    $window.show();
  }
  
  this.animateAchievement = function(a) {
    var iconName = a.n;
    if (typeof a.p != 'undefined') {
      iconName += a.p;
    }
    
    $.jGrowl(a.description, {
      header: a.header + ' +' + a.s,
      theme:  'achievement',
      iconName: iconName,
      life: 1000000});
  }
  
  this.animateAnswer = function() {
    var oldBackground = $('#answer').css('background-color');
    var newBackground = '#fff';
    $('#answer').css('background-color', newBackground);
    setTimeout(function(){
      $('#answer').css('background-color', oldBackground);
    }, 200);
  }

  this.updateLevelBar = function(level, score, maxLevel, nextLevelCallback) {
    if (level >= maxLevel) {
      return false;
    }
    
    $levelBar = $('#level-bar .level-chunk');
    var maxLevelBarLen = 480;
    var levelBarLen = score / level;
    
    if (levelBarLen > maxLevelBarLen) {
      levelBarLen -= maxLevelBarLen;
      if (typeof nextLevelCallback == 'function') {
        nextLevelCallback();
      }
    }

    $levelBar.css({width: levelBarLen + 'px'});
  }
  
} 