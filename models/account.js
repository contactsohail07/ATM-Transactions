'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountSchema = new Schema({
    CardNumber: {
        type: Number,
        unique: true,
        required: true
      },
      Password: {
        type: Number,
        required: true
      },
      CardHolderName: {
        type: String,
        required: true
      },
      Balance: {
        type: Number,
        required: true
      }
}, { timestamps: true });



module.exports = mongoose.model('Account', AccountSchema);
  