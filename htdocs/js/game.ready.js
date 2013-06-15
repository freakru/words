var mainwords = {'ru':'инструмент',
'en':'nationalization',
'de':'durchsichtlichkeit,reißverschluss'
}
;
//['кожзгсф'],
//['доремифасольляси'],
//['абвгдежзийклмнопрстуфхцчшщыьэюя'],

var maxLetterWeight = 10;
var minWordLen = 2;
var minScore = 5;
var lang = 'en';//navigator.language;
var debug = true;

var game = new Game();
var graphic = new Graphic();
var request = new Request();

function log () {
  return debug && 'console' in window ? console.log.apply(console, arguments) : null;
}


var isLocalStorageSupports = function() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {return false;
  }
}

// in percent
var letterFrequency = {
  ru: {
    'о': 9.28,
    'а': 8.66,
    'е': 8.10,
    'и': 7.45,
    'н': 6.35,
    'т': 6.30,
    'р': 5.53,
    'с': 5.45,
    'л': 4.32,
    'в': 4.19,
    'к': 3.47,
    'п': 3.35,
    'м': 3.29,
    'у': 2.90,
    'д': 2.56,
    'я': 2.22,
    'ы': 2.11,
    'ь': 1.90,
    'з': 1.81,
    'б': 1.51,
    'г': 1.41,
    'й': 1.31,
    'ч': 1.27,
    'ю': 1.03,
    'х': 0.92,
    'ж': 0.78,
    'ш': 0.77,
    'ц': 0.52,
    'щ': 0.49,
    'ф': 0.40,
    'э': 0.17,
    'ъ': 0.04},
  en: {
    'a':8.167,
    'b':1.492,
    'c':2.782,
    'd':4.253,
    'e':12.702,
    'f':2.228,
    'g':2.015,
    'h':6.094,
    'i':6.966,
    'j':0.153,
    'k':0.772,
    'l':4.025,
    'm':2.406,
    'n':6.749,
    'o':7.507,
    'p':1.929,
    'q':0.095,
    'r':5.987,
    's':6.327,
    't':9.056,
    'u':2.758,
    'v':0.978,
    'w':2.360,
    'x':0.150,
    'y':1.974,
    'z':0.074},
  de: {
    'e':17.40,
    'n':9.78,
    'i':7.55,
    's':7.27,
    'r':7.00,
    'a':6.51,
    't':6.15,
    'd':5.08,
    'h':4.76,
    'u':4.35,
    'l':3.44,
    'c':3.06,
    'g':3.01,
    'm':2.53,
    'o':2.51,
    'b':1.89,
    'w':1.89,
    'f':1.66,
    'k':1.21,
    'z':1.13,
    'p':0.79,
    'v':0.67,
    'ß':0.31,
    'j':0.27,
    'y':0.04,
    'x':0.03,
    'q':0.02}
}

$(function() {
  $('.draggable').draggable();
  game.play();
});