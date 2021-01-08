// ======================
// Puerto
// ======================

process.env.PORT = process.env.PORT || 3001;

// ======================
// Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Base de datos
// ======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/websocket';
} else {
    urlDB = "mongodb+srv://gatunosh:AP8LfhmLZI5tzynS@websocketnodejs.quwbh.mongodb.net/websocket";
}

process.env.URLDB = urlDB;