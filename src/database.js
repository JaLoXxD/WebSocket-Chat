const mongoose = require('mongoose');
const { db } = require('./models/image');

mongoose.connect('mongodb://localhost/websocket', {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));