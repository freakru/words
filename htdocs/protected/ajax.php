<?php
  if (!isset($_SESSION)) {
    session_start();
  }

  function __autoload($className) {
      require_once $className . '.php';
  }

  $r = $_REQUEST['r'];
  if ($r == 'dictionary/try') {
    $word = $_REQUEST['word'];
    
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo DictionaryUtils::isAllowedWord($word);
    return false;
  }
  
  
  if ($r == 'user/enter-username') {
    $username = $_REQUEST['username'];
    
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo UserUtils::enterUsername($username);
    return false;
  }
  
  
  
  if ($r == 'user/set-score') {
    $score = $_REQUEST['score'];
    
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    
    echo UserUtils::setScore($score);
    return false;
  }
  
  
  
  if ($r == 'user/get-scores') {
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    
    echo UserUtils::getScores();
    return false;
  }
  
  
  if ($r == 'user/reset') {
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    
    session_unset();
    session_write_close();
    echo json_encode(null);
    return false;
  }
  
  
  
  if (isset($r) && $r == 'dictionary/add-word') {
    $word = $_REQUEST['word'];
    $userId = $_REQUEST['userId'];
    
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo DictionaryUtils::addWord($word, $userId);
    return false;
  }