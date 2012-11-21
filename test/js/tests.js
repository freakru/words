test('Timer', function() {

  function time(val, expected, message) {
    equal(val.formatTime(), expected, message);
  }
  
  var val = 0;
  time(val, '00:00:00', 'Null time');
  
  val = 59;
  time(val, '00:00:59', '59 seconds');
  
  val = 60;
  time(val, '00:01:00', '1 minute');
  
  val = 30 * 60;
  time(val, '00:30:00', '30 minutes');
  
  val = 60 * 60;
  time(val, '01:00:00', '1 hour');
  
  val = 60 * 60 + 48 * 60 + 25;
  time(val, '01:48:25', '1 hour 48 min 25 sec');
  
  val = 99;
  time(val, '00:01:39', '1 min 39 sec');
  
  val = -1;
  time(val, '00:00:00', 'ignore negative');
});