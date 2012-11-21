<?php
class GObject {
  public function __get($name) {
    if (property_exists(get_class($this), $name)) {
      return $this->$name;
    }
    return null;
  }
  
  public function __set($name, $value) {
    $this->$name = $value;
  }
}