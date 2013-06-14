<?php
header('Content-Type: text/html; charset=utf-8') ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="js/lib/jquery-2.0.2.min.js"></script>
  <script src="js/lib/jquery-ui.min.js"></script>
  <script src="js/lib/jquery.jgrowl.min.js"></script>
  <script src="bootstrap/js/bootstrap.js"></script>
  <script src="js/game.functions.js"></script>
  
  <script src="js/game.js"></script>
  <script src="js/game.achievements.js"></script>
  <script src="js/game.graphic.js"></script>
  <script src="js/game.request.js"></script>
  <script src="js/game.ready.js"></script>
  
  <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" type="text/css"/>
  <link rel="stylesheet" href="css/jquery.jgrowl.css" type="text/css"/>
  <link rel="stylesheet" href="css/simplemodal.css" type="text/css"/>
  <link rel="stylesheet" href="css/main.css" type="text/css" />
</head>
<body>

  <div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
      <div class="container">
        <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="nav-collapse collapse">
          <ul class="nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="nav-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
            <li><a id="level"></a></li>
            <li><a id="timer"></a></li>
            <li><a id="score"></a></li>
            <li><a id="words"></a></li>
          </ul>
          <form class="navbar-form pull-right">
            <input class="span2" type="text" placeholder="Email">
            <input class="span2" type="password" placeholder="Password">
            <button type="submit" class="btn">Sign in</button>
          </form>
        </div><!--/.nav-collapse -->
      </div>
    </div>
  </div>

  <div class="container">

    <div class="hero-unit">

      <div id="bar">
        <a href="" id="showMenu" title=""></a>
        <div id="menu">
          <ul>
            <li><a id="new" href="#"></a></li>
            <li><a id="achiev" href="#"></a></li>
            <li><a id="scores" href="#"></a></li>
          </ul>
        </div>
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

  </div><!-- hero-unit -->

</div><!-- container -->

<div id="modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 data-t="hallo"></h3>
  </div>
  <div class="modal-body">
    <form class="form-horizontal">
      <div class="control-group">
        <label id="username-label" class="control-label" for="username">Email</label>
        <div class="controls">
          <input type="text" id="username" placeholder="">
        </div>
      </div>
      <div class="control-group">
        <div class="controls">
          <a href="#" id="lang-en" data-lang="en" class="lang"></a>
          <a href="#" id="lang-de" data-lang="de" class="lang"></a>
          <a href="#" id="lang-ru" data-lang="ru" class="lang"></a>
        </div>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button data-t="save" class="btn btn-primary"></button>
  </div>
</div>
  
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