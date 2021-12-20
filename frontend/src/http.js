const url = 'http://localhost:3000';

export function signInWithEmail(email, password) {
    return new Promise(resolve => {
        fetch(`${url}/auth/signInEmail`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function signInWithId(idUser) {
    return new Promise(resolve => {
        fetch(`${url}/auth/signInId`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idUser})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function register(firstName, lastName, email, password, address, city, province, postalCode) {
    return new Promise(resolve => {
        fetch(`${url}/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, password, address, city, province, postalCode})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getAllBooks() {
    return new Promise(resolve => {
        fetch(`${url}/getAllBooks`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getBook(ISBN) {
    return new Promise(resolve => {
        fetch(`${url}/getBook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ISBN})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getAuthor(idAuthor) {
    return new Promise(resolve => {
        fetch(`${url}/getAuthor`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idAuthor})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getPublisher(idPublisher) {
    return new Promise(resolve => {
        fetch(`${url}/getPublisher`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idPublisher})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function addOrder(idUser, status, datePlaced, total, shipping, billing) {
    return new Promise(resolve => {
        fetch(`${url}/addOrder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idUser, status, datePlaced, total, shipping, billing})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function addOrderItem(isbn, idOrder, quantity, finalItemPrice, finalBulkCost) {
    return new Promise(resolve => {
        fetch(`${url}/addOrderItem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({isbn, idOrder, quantity, finalItemPrice, finalBulkCost})
        })
        .then(response => console.log(response))
        .then(data => resolve(data));
    });
}

export function getOrders(idUser) {
    return new Promise(resolve => {
        fetch(`${url}/getOrders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idUser})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getOrderItems(idOrder) {
    return new Promise(resolve => {
        fetch(`${url}/getOrderItems`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idOrder})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function checkItemStock(isbn, quantity) {
    return new Promise(resolve => {
        fetch(`${url}/checkItemStock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({isbn, quantity})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}


export function addReview(isbn, idUser, rating, review) {
    return new Promise(resolve => {
        fetch(`${url}/addReview`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({isbn, idUser, rating, review})
        })
        .then(response => console.log(response))
        .then(data => resolve(data));
    });
}

export function getReviews(isbn) {
    return new Promise(resolve => {
        fetch(`${url}/getReviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({isbn})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getUserName(idUser) {
    return new Promise(resolve => {
        fetch(`${url}/getUserName`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idUser})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getAllOrderItems() {
    return new Promise(resolve => {
        fetch(`${url}/getAllOrderItems`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getBooksNeedingRestock() {
    return new Promise(resolve => {
        fetch(`${url}/getBooksNeedingRestock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function getRestockAmount(isbn) {
    return new Promise(resolve => {
        fetch(`${url}/getRestockAmount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({isbn})
        })
        .then(response => response.json())
        .then(data => resolve(data));
    });
}

export function restock(restock, isbn) {
    return new Promise(resolve => {
        fetch(`${url}/restock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({restock, isbn})
        })
        .then(response => console.log(response))
        .then(data => resolve(data));
    });
}

export function adminAddBook(isbn, title, idAuthor, genre, pageCount, customerPrice, stock, bulkCost, isActive, idPublisher, releaseYear, publisherCut) {
    return new Promise(resolve => {
        fetch(`${url}/admin/addBook`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({isbn, title, idAuthor, genre, pageCount, customerPrice, stock, bulkCost, isActive, idPublisher, releaseYear, publisherCut})
        })
        .then(response => console.log(response))
        .then(data => resolve(data));
    });
}

export function adminAddAuthor(idAuthor, name, address, email, phoneNumber, bankingAccount) {
    return new Promise(resolve => {
        fetch(`${url}/admin/addAuthor`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idAuthor, name, address, email, phoneNumber, bankingAccount})
        })
        .then(response => console.log(response))
        .then(data => resolve(data));
    });
}

export function adminAddPublisher(idPublisher, name, address, email, phoneNumber, bankingAccount) {
    return new Promise(resolve => {
        fetch(`${url}/admin/addPublisher`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idPublisher, name, address, email, phoneNumber, bankingAccount})
        })
        .then(response => console.log(response))
        .then(data => resolve(data));
    });
}

export function adminDeleteBook(isbn) {
    return new Promise(resolve => {
        fetch(`${url}/admin/deleteBook`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({isbn})
        })
        .then(response => console.log(response))
        .then(data => resolve(data));
    });
}