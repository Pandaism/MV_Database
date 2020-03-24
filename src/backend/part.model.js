const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Part = new Schema({
    part_number: {
        type: String
    },
    part_specs: {
        type: String
    },
    submitter: {
        type: String
    },
    files: {
        type: []
    }
});

module.exports = mongoose.model('Part', Part)