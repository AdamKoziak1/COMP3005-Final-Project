CREATE TABLE `Book` (
  `ISBN` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `idAuthor` varchar(45) DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `pageCount` varchar(45) DEFAULT NULL,
  `customerPrice` varchar(45) DEFAULT NULL,
  `stock` varchar(45) DEFAULT NULL,
  `bulkCost` varchar(45) DEFAULT NULL,
  `isActive` varchar(45) DEFAULT NULL,
  `idPublisher` varchar(45) DEFAULT NULL,
  `releaseYear` varchar(45) DEFAULT NULL,
  `publisherCut` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ISBN`),
  FOREIGN KEY ('idAuthor') REFERENCES 'Author'
);

CREATE TABLE `Author` (
  `idAuthor` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  `bankingAccount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idAuthor`)
);

CREATE TABLE `Orders` (
  `idOrder` varchar(45) NOT NULL,
  `idUser` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `datePlaced` varchar(45) DEFAULT NULL,
  `total` varchar(45) DEFAULT NULL,
  `billing` varchar(45) DEFAULT NULL,
  `shipping` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idOrder`),
  FOREIGN KEY ('idUser') REFERENCES 'User'
);

CREATE TABLE `OrderItem` (
  `ISBN` varchar(45) NOT NULL,
  `idOrder` varchar(45) NOT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `finalItemPrice` varchar(45) DEFAULT NULL,
  `finalBulkCost` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ISBN`,`idOrder`),
  FOREIGN KEY ('ISBN') REFERENCES 'Book',
  FOREIGN KEY ('idOrder') REFERENCES 'Order'
);

CREATE TABLE `Publisher` (
  `idPublisher` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  `bankingAccount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPublisher`)
);

CREATE TABLE `Review` (
  `ISBN` varchar(45) NOT NULL,
  `idUser` varchar(45) NOT NULL,
  `rating` varchar(45) DEFAULT NULL,
  `review` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ISBN`,`idUser`),
  FOREIGN KEY ('ISBN') REFERENCES 'Book',
  FOREIGN KEY ('idUser') REFERENCES 'User'
);

CREATE TABLE `User` (
  `idUser` varchar(45) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `postalCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
);