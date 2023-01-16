const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder');
const fs = require('fs');
const qs = require('qs');

let handlers = {};
handlers.users = (req, res) => {
    fs.readFile('./users.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })
}
handlers.products = (req, res) => {
    fs.readFile('./products.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })
}
handlers.notFound = (req, res) => {
    fs.readFile('./notFound.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })
}

let router = {
    'users': handlers.users,
    'products': handlers.products,
}

const server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');

    let choosenHandler = (typeof router[trimPath] != 'undefined') ? router[trimPath] : handlers.notFound;
    choosenHandler(req, res);
});
server.listen(8080, () => {
    console.log('Server is running at localhost:8080')
})
