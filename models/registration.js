const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    name: String,
    email: String
})

module.exports = mongoose.model('Form', FormSchema)