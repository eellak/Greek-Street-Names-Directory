'use strict';

let fs = require('fs')
let LineByLineReader = require('line-by-line');
let db = require('./db');

const CHUNK_INSERTIONS = 1000;

const CONSTANTS = {
  ADDRESS_ID: 0,
  STREET: 1,
  POSTCODE: 3,
  MUNICIPALITY: 4,
  PREFECTURE: 9,
  ADMINISTRATIVE_REGION: 11
};

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <filename.txt>');
  process.exit(1);
}

let filename = process.argv[2];

let lr = new LineByLineReader(filename, { skipEmptyLines: true });

lr.on('error', (err) => {
  // 'err' contains error object
});

let iterator = 1;
let counter = 0;
let addressInsertionsArray = [];

lr.on('line', (line) => {
  // 'line' contains the current line without the trailing newline character.
  let addressArray = line.split('|');

  let data = {
    addressId: addressArray[CONSTANTS.ADDRESS_ID],
    street: addressArray[CONSTANTS.STREET],
    postCode: addressArray[CONSTANTS.POSTCODE],
    municipality: addressArray[CONSTANTS.MUNICIPALITY],
    prefecture: addressArray[CONSTANTS.PREFECTURE],
    administrativeRegion: addressArray[CONSTANTS.ADMINISTRATIVE_REGION] || null
  };

  addressInsertionsArray.push(data);
  counter++;

  if (counter > CHUNK_INSERTIONS) {
    lr.pause();
    bulkInsert(addressInsertionsArray, function (err, docs) {
      counter = 0;
      iterator++;
      addressInsertionsArray = [];
      lr.resume();
    });
  }

  // console.log('line: ' + line);
});

lr.on('end', () => {
  // All lines are read, file is closed now. Instert the lates entries.
  bulkInsert(addressInsertionsArray, function (err, docs) {
    console.log('Finished parsing the text file.');
    db.closeConnection();
  })
});

function bulkInsert(addressArray, callback) {
  db.addressModel.insertMany(addressArray, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Inserted: ${iterator*CHUNK_INSERTIONS} entries`);
    }

    return callback(err, docs);
  });
}
