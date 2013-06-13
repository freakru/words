<?php
class UserUtils {

  public static function enterUsername($userName) {
    $dao = Database::getInstance();
    
    $user = new User();
    $user->name = $userName;
    $user->save();
    $user->login();
    
    $userId = $user->id;

    return json_encode(array(
      'userId' => $userId,
      'userName' => $userName,
      'success' => true));
  }
  
  public static function setScore($score) {
    $user = App::getUser();
    if ($user == null) {
      return json_encode(null);
    }
    
    $user->score = $score;
    $user->save();
      
    $dao = Database::getInstance();
    $isFirst = array();
    $collectionRaw = $dao->query('user', 'score=(SELECT MAX(score) FROM tbl_user)');
    foreach ($collectionRaw as $row) {
      $isFirst = array('isFirst' => $row['username'] == $user->name,
      'name' => $row['username'],
      'score' => $row['score']);
    }
    return json_encode($isFirst);
  }
  
  public static function getScores() {
    $dao = Database::getInstance();
    
    $collection = array();
    $collectionRaw = $dao->query('user', 'score > 0', 'score DESC');
    foreach ($collectionRaw as $row) {
      $collection[] = array('name' => $row['username'], 'score' => $row['score']);
    }
    return json_encode($collection);
  }
}