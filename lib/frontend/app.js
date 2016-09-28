var express = require('express');
var app = express();

// console.log(`${__dirname}/public-modules`);
app.use('/modules', express.static(`${__dirname}/node_modules`));
app.use('/public', express.static(`${__dirname}/public`));

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

