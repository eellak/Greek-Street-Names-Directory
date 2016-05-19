'use strict';

let fs = require('fs')
let LineByLineReader = require('line-by-line');
let db = require('./db');

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <filename.txt>');
  process.exit(1);
}

let filename = process.argv[2];

let lr = new LineByLineReader(filename, { skipEmptyLines: true });

lr.on('error', (err) => {
  // 'err' contains error object
});

lr.on('line', (line) => {
  // 'line' contains the current line without the trailing newline character.
  let addressArray = line.split('|');

  let data = {
    addressId: addressArray[0],
    street: addressArray[1],
    postCode: addressArray[3],
    municipality: addressArray[4],
    prefecture: addressArray[9],
    administrativeRegion: addressArray[11] || null
  };

  let address = new db.addressModel(data);

  lr.pause();
  address.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`address inserted: ${data.addressId}`);
    }
    lr.resume();
  });

  // console.log('line: ' + line);
});

lr.on('end', () => {
  // All lines are read, file is closed now.
  console.log('Finished parsing the text file.');

  db.closeConnection();
});
