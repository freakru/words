String.prototype.contains = function(chunk) {
  if (typeof(chunk) == 'object') {
    for (var i = 0; i < chunk.length; i++) {
      if (this.contains(chunk[i])) {
        return true;
      }
    }
    return false;
  }
  return this.indexOf(chunk) != -1;
}

String.prototype.lastChar = function() {
  return this.charAt(this.length - 1);
}

String.prototype.firstChar = function() {
  return this.charAt(0);
}

String.prototype.shrink = function() {
  return this.substring(0, this.length - 1);
}

String.prototype.reverse = function(){
  return this.split('').reverse().join('');
}

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};

String.prototype.strong = function() {
  return '<strong>' + this + '</strong>';
}

String.prototype.format = function() {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    formatted = formatted.replace("{" + i + "}", arguments[i]);
  }
  return formatted;
}

String.prototype.containsRare = function() {
  var rareLetters = game.rareLetters;
  for (var i = 0; i < rareLetters.length; i++) {
    if (this.contains(rareLetters[i])) {
      return true;
    }
  }
  return false;
}

Date.prototype.toJSON = function (key) {
  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? '0' + n : n;
  }
  return isFinite(this.valueOf()) ?
         this.getUTCFullYear()   + '-' +
       f(this.getUTCMonth() + 1) + '-' +
       f(this.getUTCDate())      + 'T' +
       f(this.getUTCHours())     + ':' +
       f(this.getUTCMinutes())   + ':' +
       f(this.getUTCSeconds())   + 'Z' : null;
};

String.prototype.toJSON =
Number.prototype.toJSON =
Boolean.prototype.toJSON = function (key) {
    return this.valueOf();
};



String.prototype.fromIsoDate = function() {
  return new Date(this.replace(/-/g,"/").replace(/[T]/g," ").replace(/Z$/g, ""));
}

Array.prototype.contains = function(element) {
  return this.indexOf(element) != -1;
}


Array.prototype.clone = function () {
  var arr1 = new Array(); 
  for (var property in this) {
    arr1[property] = typeof (this[property]) == 'object' ? this[property].clone() : this[property]
  }
  return arr1;
}

Array.prototype.containsWord = function(word) {
  for (var i = 0; i < this.length; i++) {
    var answer = this[i];
    if (answer.w == word) {
      return true;
    }
  }
  return false;
}

/**
 * Sort answers alphabetically
 */ 
Array.prototype.sortA = function() {
  return this.sort(function(a, b) {
    var nameA = a.w.toLowerCase(), nameB = b.w.toLowerCase();
    if (nameA < nameB)
      return -1; 
    if (nameA > nameB)
      return 1;
    return 0;
  });
}

/**
 * Sort answers by letters count
 */ 
Array.prototype.sortL = function() {
  return this.sort(function(a, b) {
    var lengthA = a.w.length, lengthB = b.w.length;
    if (lengthA < lengthB)
      return -1; 
    if (lengthA > lengthB)
      return 1;
    return 0;
  });
}

/**
 * Sort answers by score
 */ 
Array.prototype.sortS = function() {
  return this.sort(function(a, b) {
    var nameA = a.s, nameB = b.s;
    if (nameA < nameB)
      return -1; 
    if (nameA > nameB)
      return 1;
    return 0;
  });
}

Array.prototype.sortC = function() {
  return this.sort(function(a, b) {
    var isA = a.isCompleted, isB = b.isCompleted;
    if (isA)
      return -1;
    if (isB)
      return 1;
  });
}

function clone(obj){
  if(obj == null || typeof(obj) != 'object')
    return obj;

  var temp = new obj.constructor(); // changed (twice)
  for(var key in obj)
    temp[key] = clone(obj[key]);

  return temp;
}

Number.prototype.formatTime = function() {
  var hours = parseInt(this / 60 / 60);
  
  var minutes = parseInt(this / 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var sec = this - (minutes * 60);
  sec = sec < 10 ? '0' + sec : sec;
  return hours + ':' + minutes + ':' + sec;
}

Date.prototype.format = function() {
  var day = this.getDate();
  var month = (this.getMonth() + 1) < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1;
  var year = this.getFullYear();
  return day + '.' + month + '.' + year;
}