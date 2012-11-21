<?php
class App {
  private static $instance;
  
  public static function getInstance() {
    if (self::$instance == null) {
      self::$instance = new App();
    }
    return self::$instance;
  }

  public static function getUser() {
    $app = App::getInstance();
    return $app->getSetting('user');
  }
  
  public static function getSetting($name) {
    return isset($_SESSION[$name]) ? $_SESSION[$name] : null;
  }
  
  public static function setSetting($name, $value) {
    $_SESSION[$name] = $value;
  }
}