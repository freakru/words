<?php
class DictionaryUtils {

  public static function isAllowedWord($word) {
    $dao = Database::getInstance();
    
    $collDictionary = $dao->query('dictionary', 'word = "'.$word.'"');
    $collUserDictionary = $dao->query('userdictionary', 'word = "'.$word.'"');
    
    $isAllowed = false;
    if (count($collDictionary) || count($collUserDictionary)) {
      $isAllowed = true;
    }

    return json_encode(array('word' => $word, 'isAllowed' => $isAllowed));
  }
  
  public static function addWord($word) {
    $dao = Database::getInstance();
    $user = App::getUser();

    $dao->insert('userdictionary', array(
      'word' => $word,
      'user_id' => $user->id,
      'date_add' => date('Y-m-d H:i:s')
      ));
    
    return json_encode(array('word' => $word, 'success' => true));
  }
  
}