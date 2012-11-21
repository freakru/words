CREATE TABLE tbl_user (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  oid VARCHAR(128) NOT NULL,
  username VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  score INTEGER DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

score 1
level 2
words 3
time 4
other 10
*животные, растения,логия

CREATE TABLE tbl_achievement (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,
  stype INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  header VARCHAR(128) NOT NULL,
  description text NOT NULL,
  score INTEGER NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tbl_stringbundle (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,
  svalue text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tbl_dictionary (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  word VARCHAR(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tbl_userdictionary (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  date_add DATETIME NOT NULL, 
  word VARCHAR(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO tbl_dictionary (word) VALUES ('');

INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('score200', 1, 200, 'Это только начало', 'Наберите 200 очков', '10');
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('score500', 1, 500, 'Еще, еще, еще!', 'Наберите 500 очков', '10');
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('score1000', 1, 1000, 'Кто хочет стать...', 'Наберите 1000 очков', '15');
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('score10000', 1, 10000, 'Читер!', 'Наберите 10.000 очков', '15');

INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('level2', 2, 2, 'Уже не нуб', 'Достигните 2-го уровня', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('level5', 2, 5, 'Почти бог', 'Достигните 5-го уровня', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('level10', 2, 10, 'Нет предела совершенству', 'Достигните 10-го уровня', 15);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('level20', 2, 20, '***', 'Достигните 20-го уровня', 30);

INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('words20', 3, 20, '***', 'Составьте 20 слов', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('words50', 3, 50, '***', 'Составьте 50 слов', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('words100', 3, 100, '***', 'Составьте 100 слов', 15);

INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('time10', 4, 10, 'Время - деньги', 'Играйте 10 минут', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('time30', 4, 30, 'Полчаса', 'Играйте 30 минут', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('time60', 4, 60, 'А потехе - час', 'Играйте 1 час', 15);

INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('shortWordsMaster1', 10, 0, 'Эллочка-людоедка', 'Составьте 10 коротких слов', 15);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('rareLettersMaster', 10, 0, 'Эрудит', 'Используйте 10 раз одну из редких букв', 20);

INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('rareLetter', 10, 0, 'Букварь', 'Используйте редкую букву', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('longWord', 10, 0, 'Размер имеет значение', 'Составьте слово из 7-и или боллее букв', 15);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('palindrome', 10, 0, 'А роза упала на лапу Азора', 'Найдите палиндром к одному из ваших слов', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('anagram', 10, 0, 'ААААГММНР', 'Найдите анаграмму к одному из ваших слов', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('expensiveWord', 10, 0, 'Жадность до добра не доведет', 'Составьте слово на 30 или более очков', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('expensiveWord', 10, 0, 'Жадность до добра не доведет', 'Составьте слово на 30 или более очков', 10);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('note7', 10, 0, 'Семь нот', 'Соберите все 7 нот', 15);
INSERT INTO tbl_achievement (title, stype, amount, header, description, score) VALUES ('rainbow', 10, 0, 'Радуга', 'Составьте слова, начинающиеся с букв цветов радуги', 15);
