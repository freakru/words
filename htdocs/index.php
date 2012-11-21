<?php
header('Content-Type: text/html; charset=utf-8') ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script-->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js"></script>
  <script type="text/javascript" src="js/jquery.jgrowl.js"></script>
  <script type="text/javascript" src="js/jquery.simplemodal.1.4.1.min.js"></script>
  <script src="js/game.functions.js"></script>
  
  <script src="js/game.js"></script>
  <script src="js/game.achievements.js"></script>
  <script src="js/game.graphic.js"></script>
  <script src="js/game.request.js"></script>
  <script src="js/game.ready.js"></script>
  
  <link rel="stylesheet" href="css/jquery.jgrowl.css" type="text/css"/>
  <link rel="stylesheet" href="css/simplemodal.css" type="text/css"/>
  <link rel="stylesheet" href="css/main.css" type="text/css" />
</head>
  <div id="modal">
    <label id="username-label" for="username"></label><br />
    <input id="username" type="text" />
    <input id="username-enter" type="button" value="ok" class="modalClose" />
    <a href="#" id="lang-en" data-lang="en" class="lang"></a>
    <a href="#" id="lang-de" data-lang="de" class="lang"></a>
    <a href="#" id="lang-ru" data-lang="ru" class="lang"></a>
  </div>
  <div id="bar">
    <a href="" id="showMenu" title=""></a>
    <div id="menu">
      <ul>
        <li><a id="new" href="#"></a></li>
        <li><a id="achiev" href="#"></a></li>
        <li><a id="scores" href="#"></a></li>
      </ul>
    </div>
    <div id="user"></div>
    <div id="level"></div>
    <div id="timer"></div>
    <div id="words"></div>
    <div id="score"></div>
    <div class="clear"></div>
  </div>
  <div id="level-bar">
    <div class="level-chunk"></div>
  </div>
  
  <div class="box">
    
  </div>
  
  <div class="form">
    <input id="answer" type="text" />
    <a href="#" id="enter"></a>
    <div class="clear"></div>
    <span id="possibleScore"></span>
  </div>
  
  <div id="message-container">
    <div id="message"></div>
  </div>
  <div id="answerContainer">
    <table>
      <thead>
        <tr>
          <td>
            <a id="sort-a"></a>
          </td>
          <td>
            <a id="sort-l"></a>
          </td>
          <td>
            <a id="sort-s"></a>
          </td>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
  <div id="status"></div>
  
  <div id="win-achievements" class="window draggable">
    <div class="win-header"></div>
    <a href="" class="close"></a>
    <div class="clear"></div>
    <div class="win-content"></div>
  </div>
  
  <div id="win-scores" class="window draggable">
    <div class="win-header"></div>
    <a href="" class="close"></a>
    <div class="clear"></div>
    <div class="win-content"></div>
  </div>
  
  
</body>
</html>