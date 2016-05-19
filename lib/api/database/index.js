'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let addressSchema = new Schema({
  addressId: { type: Number, required: true },
  street: { type: String, required: true },
  postCode: { type: Number, required: true },
  municipality: { type: String, required: true },
  prefecture: { type: String, required: true },
  administrativeRegion: { type: String }
});

mongoose.model('addresses', addressSchema);

setup.consumes = [];
setup.provides = ['models'];

module.exports = setup;

function setup(options, imports, register) {
  let dbName = process.env.DATABASE_NAME || 'greek-addresses';

  let uri = `mongodb://localhost/${dbName}`;

  let connection = mongoose.createConnection(uri, { server: { poolSize: 10 } });

  return register(null, {
    models: {
      AddressesModel: connection.model('addresses')
    }
  });
};
