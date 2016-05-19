'use strict';

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greek-addresses-small-test');

let schema = {
  addressId: { type: Number, required: true },
  street: { type: String, required: true },
  postCode: { type: Number, required: true },
  municipality: { type: String, required: true },
  prefecture: { type: String, required: true },
  administrativeRegion: { type: String }
}

module.exports = {
  addressModel: mongoose.model('address', schema),
  closeConnection: function () {
    mongoose.connection.close();
  }
};