const {Schema , model} = require('mongoose')

const imageSchema = new Schema({
    title: { type: String},
    description: { type: String},
    filename: { type: String},
    path: { type: String}
});

module.exports = model('image',imageSchema);