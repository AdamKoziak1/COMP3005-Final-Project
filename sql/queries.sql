-- NOTE: these queries are copied from inside the web app, this is just a collection of the queries from inside the server code

-- find user from email and password
SELECT * FROM User WHERE email = req.body.email AND password = req.body.password;

-- finds user from userID
SELECT * FROM User WHERE idUser = req.body.idUser;

-- inserts multiple user-inputted values (stored in req.body) into a new user tuple 
INSERT INTO User SET req.body;

-- finds all books
SELECT * FROM Book;

-- finds the book with the given ISBN
SELECT * FROM Book WHERE ISBN = req.body.ISBN;

-- finds the author with the given ID
SELECT * FROM Author WHERE idAuthor = req.body.idAuthor;

-- finds the publisher with the given ID
SELECT * FROM Publisher WHERE idPublisher = req.body.idPublisher;

-- inserts multiple user-inputted values (stored in req.body) into a new order tuple 
INSERT INTO Orders SET req.body;

-- finds the order with the given ID
SELECT * FROM Orders WHERE idOrder = req.body.idOrder;

-- inserts multiple user-inputted values (stored in req.body) into a new orderItem tuple 
INSERT INTO OrderItem SET req.body;

-- updates a book's stock after an order is placed
UPDATE Book SET stock = stock - req.body.quantity WHERE ISBN = req.body.isbn

-- finds a book with a given id if it has the required stock
SELECT * FROM Book WHERE ISBN = req.body.isbn AND stock >= req.body.quantity;

-- finds all orders for a given user ID
SELECT * FROM Orders WHERE idUser = req.body.idUser;

-- finds all order items for a given order
SELECT * FROM OrderItem WHERE idOrder = req.body.idOrder;

-- inserts multiple user-inputted values (stored in req.body) into a new review tuple 
INSERT INTO Review SET req.body;

-- finds all reviews for a book given its ISBN
SELECT * FROM Review WHERE ISBN = req.body.isbn;

-- finds a user's ID and full name given the ID
SELECT idUser, firstName, lastName FROM User WHERE idUser = req.body.idUser;

-- finds all order items
SELECT * FROM OrderItem;

-- finds all books with less than 10 units in stock
SELECT * FROM Book WHERE stock <= 10;

-- counts total number of book sales for a given book in the time interval specified
SELECT SUM(quantity) FROM OrderItem NATURAL JOIN Orders WHERE ISBN = req.body.isbn AND datePlaced BETWEEN oldDate AND newDate;

-- updates the stock of a book given the ID with the amount from the last query
UPDATE Book SET stock = stock + req.body.restock WHERE ISBN = req.body.isbn;

-- inserts multiple user-inputted values (stored in req.body) into a new book tuple 
INSERT INTO Book SET req.body;

-- inserts multiple user-inputted values (stored in req.body) into a new author tuple 
INSERT INTO Author SET req.body;

-- inserts multiple user-inputted values (stored in req.body) into a new publisher tuple 
INSERT INTO Publisher SET req.body;

-- deletes the book with the given ID
DELETE FROM Book WHERE ISBN = req.body.isbn;