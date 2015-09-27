'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        default: "unknown team name"
    },
    user: {
        type: String
    },
    number: { 
        type: Number
    },
    picture: {
        type: String,
        default: "http://summation.typepad.com/.a/6a00d8345189aa69e20168eb23358c970c-pi"
    },
    record: {
        type: String
    },
    standing: {
        type: String
    }
});

mongoose.model('Team', schema);