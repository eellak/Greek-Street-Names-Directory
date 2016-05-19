'use strict';

setup.consumes = [];
setup.provides = ['config'];

module.exports = setup;

function setup(options, imports, register) {
  const config = {
    DATABASE_NAME: process.env.DATABASE_NAME || 'greek-addresses',
    PORT: process.env.PORT || 8080
  }

  return register(null, {
    config: config
  });
};
