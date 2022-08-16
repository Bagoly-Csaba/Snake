# Snake

Deap sea snake is a full stack web aplication built with react on the frontend and node on the backend with a built in ai that can solve any map

Telepítési út mutató

1. telepítenünk kell a node.js-t Download link:
https://nodejs.org/en/download/

ha ez meg van a server mappába terminállal:
npm install express body-parser mysql nodemon cors

snake mappában:
npm start
server mappában:
npm run devStart

az alkalmazás a localhost:3000 porton fog futni
a backend pedig a localhost:3001 esen

az adatbázis csatlakozást a server mappában az index.js fileban kell konfigurálni nekem user:"root" password:"" van meg adva



CREATE TABLE `snake`.`maps` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `width` INT NOT NULL,
  `height` INT NOT NULL,
  `parts` VARCHAR(45) NOT NULL,
  `stones` VARCHAR(45) NOT NULL,
  `rightS` VARCHAR(45) NOT NULL,
  `bottom` VARCHAR(45) NOT NULL,
  `uploaded_by` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `snake`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
