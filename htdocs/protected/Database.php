<?php
class Database {

  private static $instance;
  private static $link;
  private static $tablePrefix = 'tbl_';
  
  private function __construct() {
    $c = require_once('config.php');
    
    self::$link = mysql_connect($c['host'], $c['user'], $c['password']);
    mysql_select_db($c['dbname'], self::$link);
    mysql_query("SET NAMES 'utf8'", self::$link);
  }
  
  public function getInstance() {
    if (self::$instance == null) {
      self::$instance = new Database();
    }
    return self::$instance;
  }
  
  public function getLastId() {
    return mysql_insert_id(self::$link);
  }
  
  public function query($table, $where='1', $order='id') {
    $query = 'SELECT * FROM '.self::$tablePrefix.$table;
    if ($where) {
      $query .=  ' WHERE '.$where;
    }
    if ($order) {
      $query .= ' ORDER BY ' . $order;
    }
    $result = mysql_query($query) or die ($query);
    
    $collection = array();
    while ($row = mysql_fetch_assoc($result)) {
      $collection[] = $row;
    }
    return $collection;
  }
  
  public function insert($table, $fields) {
    $query = 'INSERT INTO '.self::$tablePrefix.$table
    .' ('.implode(',', array_keys($fields)).') VALUES ("'.implode('","', array_values($fields)).'")';
    $result = mysql_query($query, self::$link) or die ($query);
    return $this->getLastId();
  }
  
  public function update($table, $fields, $where) {
    $updateValues = '';
    foreach ($fields as $name => $value) {
      if ($updateValues) {
        $updateValues .= ',';
      }
    	$updateValues .= $name . '="' . $value . '"';
    }
    $query = 'UPDATE '.self::$tablePrefix.$table
    . ' SET '.$updateValues
    . ' WHERE ' . $where;
    $result = mysql_query($query, self::$link) or die ($query);
  }
  
}