const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

// Reading data from json file

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

// Importing templates

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`
);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`
);

// Creating the server

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const productCards = tempOverview
      .toString()
      .replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(productCards);
  } else if (pathname === "/product") {
    const targetProduct = dataObj[query.id];
    const product = replaceTemplate(tempProduct, targetProduct);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(product);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found !</h1>");
  }
});

// Listen for requests

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for requests on port 8000...");
});
