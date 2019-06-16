CREATE DATABASE friends_db;
USE friends_db;

CREATE TABLE friends
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	question_1 INT(10) NOT NULL,
    question_2 INT(10) NOT NULL,
    question_3 INT(10) NOT NULL,
    question_4 INT(10) NOT NULL,
    question_5 INT(10) NOT NULL,
    question_6 INT(10) NOT NULL,
    question_7 INT(10) NOT NULL,
    question_8 INT(10) NOT NULL,
    question_9 INT(10) NOT NULL,
    question_10 INT(10) NOT NULL,
    image VARCHAR(255),
    createdat TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);