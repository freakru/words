<?php
class User extends GObject {
  protected $id;
  protected $name;
  protected $score;
  
  public function __construct() {

  }
  
  public function login() {
    App::getInstance()->setSetting('user', $this);
  }
  
  public function save() {
    if ($this->id > 0) {
      return $this->update();
    }
    return $this->insert();
  }
  
  private function insert() {
    $dao = Database::getInstance();
    $this->id = $dao->insert('user', array('username' => $this->name));
  }
  
  private function update() {
    $dao = Database::getInstance();
    $dao->update('user', array(
      'username' => $this->name,
      'score' => $this->score,
    ), 'id='.$this->id);
  }
}