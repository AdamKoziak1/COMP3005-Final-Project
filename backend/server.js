const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');
const moment = require('moment');

/* API AND SQL CONFIGURATION */

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comp3005'
});

connection.connect(function(err) {
    if (err) return console.error('error: ' + err.message);
    console.log('Connected to the MySQL server.');
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());

/* AUTH ROUTES */

app.post('/auth/signInEmail', (req, res) => {
    connection.query('SELECT * FROM User WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (error, results, fields) {
        if (error || results.length == 0) res.status(404).send('Invalid email or password.');
        res.status(200).send(results[0]);
    });
});

app.post('/auth/signInId', (req, res) => {
    connection.query('SELECT * FROM User WHERE idUser = ?', [req.body.idUser], function (error, results, fields) {
        if (error || results.length == 0) res.status(404).send('Invalid email or password.');
        res.status(200).send(results[0]);
    });
});

app.post('/auth/register', (req, res) => {
    req.body.idUser = (Math.random() + '').substring(2, 5) + (Math.random() + '').substring(2, 5);
    connection.query('INSERT INTO User SET ?', req.body);
    connection.query('SELECT * FROM User WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (error, results, fields) {
        if (error || results.length == 0) res.status(404).send('Invalid email or password.');
        res.status(200).send(results[0]);
    });
});

/* GENERAL ROUTES */

app.get('/getAllBooks', (req, res) => {
    connection.query('SELECT * FROM Book', function (error, results, fields) {
        if (error) return;
        res.status(200).send(results);
    });
});

app.post('/getBook', (req, res) => {
    connection.query('SELECT * FROM Book WHERE ISBN = ?', [req.body.ISBN], function (error, results, fields) {
        if (error) return;
        res.status(200).send(results[0]);
    });
});

app.post('/getAuthor', (req, res) => {
    connection.query('SELECT * FROM Author WHERE idAuthor = ?', [req.body.idAuthor], function (error, results, fields) {
        if (error) return;
        res.status(200).send(results[0]);
    });
});

app.post('/getPublisher', (req, res) => {
    connection.query('SELECT * FROM Publisher WHERE idPublisher = ?', [req.body.idPublisher], function (error, results, fields) {
        if (error) return;
        res.status(200).send(results[0]);
    });
});

app.post('/addOrder', (req, res) => {
    req.body.idOrder = (Math.random() + '').substring(2, 5) + (Math.random() + '').substring(2, 5);
    connection.query('INSERT INTO Orders SET ?', req.body, function (error, results, fields) {
        if (error) res.status(400).send('Order cannot be inserted into table.');
        connection.query('SELECT * FROM Orders WHERE idOrder = ?', [req.body.idOrder], function (error, results, fields) {
            if (error) res.status(404).send('Invalid order id');
            res.status(200).send(results[0]);
        });
    });
});

app.post('/addOrderItem', (req, res) => {
    connection.query('INSERT INTO OrderItem SET ?', [req.body], function (error, results, fields) {
        if (error) res.status(400).send('Order item cannot be inserted into table.');
        connection.query('UPDATE Book SET stock = stock - ? WHERE ISBN = ?', [req.body.quantity, req.body.isbn], function (error, results, fields) {
            if (error) res.status(400).send('Order item cannot be inserted into table.');
            res.status(200).send(results[0]);
        });
    });
});

app.post('/checkItemStock', (req, res) => {
    console.log(req.body);
    connection.query('SELECT * FROM Book WHERE ISBN = ? AND stock >= ?', [req.body.isbn, req.body.quantity], function (error, results, fields) {
        if (error) res.status(400).send('An error occured');
        console.log(results);
        res.status(200).send(results);
    });
});

app.post('/getOrders', (req, res) => {
    connection.query('SELECT * FROM Orders WHERE idUser = ?', [req.body.idUser], function (error, results, fields) {
        if (error) return;
        res.status(200).send(results);
    });
});

app.post('/getOrderItems', (req, res) => {
    connection.query('SELECT * FROM OrderItem WHERE idOrder = ?', [req.body.idOrder], function (error, results, fields) {
        if (error) return;
        res.status(200).send(results);
    });
});

app.post('/addReview', (req, res) => {
    connection.query('INSERT INTO Review SET ?', req.body, function (error, results, fields) {
        if (error) res.status(400).send('Review cannot be inserted into table.');
        res.status(200).send(results);
    });
});

app.post('/getReviews', (req, res) => {
    connection.query('SELECT * FROM Review WHERE ISBN = ?', [req.body.isbn], function (error, results, fields) {
        if (error) res.status(400).send('Review cannot be found in the table.');
        res.status(200).send(results);
    });
});

app.post('/getUserName', (req, res) => {
    connection.query('SELECT idUser, firstName, lastName FROM User WHERE idUser = ?', [req.body.idUser], function (error, results, fields) {
        if (error) res.status(400).send('User cannot be found in the table.');
        res.status(200).send(results);
    });
});

app.post('/getAllOrderItems', (req, res) => {
    connection.query('SELECT * FROM OrderItem', function (error, results, fields) {
        if (error) res.status(400).send('An error has occured');
        res.status(200).send(results);
    });
});

app.post('/getBooksNeedingRestock', (req, res) => {
    connection.query('SELECT * FROM Book WHERE stock <= 10', function (error, results, fields) {
        if (error) res.status(400).send('An error has occured');
        res.status(200).send(results);
    });
});

app.post('/getRestockAmount', (req, res) => {
    let oldDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
    let newDate = moment().add(1, 'days').format('YYYY-MM-DD');
    connection.query('SELECT SUM(quantity) FROM OrderItem NATURAL JOIN Orders WHERE ISBN = ? AND datePlaced BETWEEN ? AND ?', [req.body.isbn, oldDate, newDate], function (error, results, fields) {
        if (error) res.status(400).send('An error has occured');
        res.status(200).send(results);
    });
});

app.post('/restock', (req, res) => {
    connection.query('UPDATE Book SET stock = stock + ? WHERE ISBN = ?', [req.body.restock, req.body.isbn], function (error, results, fields) {
        if (error) res.status(400).send('Book cannot be restocked');
        res.status(200).send(results);
    });
});

/* ADMIN ROUTES */

app.post('/admin/addBook', (req, res) => {
    connection.query('INSERT INTO Book SET ?', req.body, function (error, results, fields) {
        if (error) res.status(400).send('Book cannot be inserted into table');
        res.status(200).send('Book Inserted into Table');
    });
});

app.post('/admin/addAuthor', (req, res) => {
    connection.query('INSERT INTO Author SET ?', req.body, function (error, results, fields) {
        if (error) res.status(400).send('Author cannot be inserted into table');
        res.status(200).send('Author Inserted into Table');
    });
});

app.post('/admin/addPublisher', (req, res) => {
    connection.query('INSERT INTO Publisher SET ?', req.body, function (error, results, fields) {
        if (error) res.status(400).send('Publisher cannot be inserted into table');
        res.status(200).send('Publisher inserted into table');
    });
});

app.post('/admin/deleteBook', (req, res) => {
    connection.query('DELETE FROM Book WHERE ISBN = ?', req.body.isbn, function (error, results, fields) {
        if (error) res.status(400).send('Book cannot be deleted from table');
        res.status(200).send('Book deleted from table');
    });
});

/* START API */

app.listen(3000, () => console.log('API started on port 3000.'));