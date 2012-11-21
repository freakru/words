function Request() {
  this.get = function(data, successCallback) {
    $.ajax({
      url: 'protected/ajax.php',
      type: 'post',
      data: data,
      dataType: 'json',
      success: function(data) {
        if (typeof successCallback == 'function') {
          successCallback.call(this, data);
        } 
      },
      error: function() {
        console.log("error");
      }
    });
  }
}