'use strict';

// @todo: move this outside of routes!

function getSkipCursor(page, limit) {
  let skip = 0;

  if (page && page > 1) {
    skip = limit * (page - 1);
  }

  return skip;
}

module.exports = {
  getSkipCursor: getSkipCursor
};
