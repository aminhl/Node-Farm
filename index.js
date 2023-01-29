const http = require("http");
const fs = require("fs");
const url = require("url");

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

// Function that replace the placeholders in the card template with the real data from the data json file
const replaceTemplate = (template, product) => {
  let output = template
    .toString()
    .replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.toString().replace(/{%IMAGE%}/g, product.image);
  output = output.toString().replace(/{%PRICE%}/g, product.price);
  output = output.toString().replace(/{%FROM%}/g, product.from);
  output = output.toString().replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.toString().replace(/{%QUANTITY%}/g, product.quantity);
  output = output.toString().replace(/{%DESCRIPTION%}/g, product.description);
  output = output.toString().replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

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
