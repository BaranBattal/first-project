const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replace = require(`${__dirname}/templates/replace`);

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const overview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview') {
    const cardHtml = dataObj.map((el) => replace(el, card)).join(' ');
    const output = overview.replace(/{%PRODUCTCARD%}/g, cardHtml);
    res.writeHead(200, {
      'content-type': 'text/html',
    });
    res.end(output);
  } else if (pathname === '/product') {
    const id = query.id;
    const output = replace(dataObj[id], product);
    res.writeHead(200, {
      'content-type': 'text/html',
    });
    res.end(output);
  } else if (pathname === '/api') {
    fs.readFile(`${__dirname}/data.json`, (err, data) => {
      res.writeHead(200, {
        'content-type': 'application/json',
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'hello',
    });
    res.end('Not found');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
