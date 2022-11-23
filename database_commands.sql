CREATE TABLE user(  
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    passwd VARCHAR(255) NOT NULL
) DEFAULT CHARSET UTF8 COMMENT '';

CREATE TABLE message(  
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    msg VARCHAR(255),
    FOREIGN KEY (username) REFERENCES user(username)
) DEFAULT CHARSET UTF8 COMMENT '';

INSERT INTO message (username, msg) VALUES ("timo","Hohhoijaa"),
("timo","Seuraava viesti..."),("timo","Taas maanantai"),("liisa","Hello world!");