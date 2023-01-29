const http = require("http");

// Creating the server

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Welcome to overview");
  } else if (pathName === "/product") {
    res.end("Welcome to product");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found !</h1>");
  }
});

// Listen for requests

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for requests on port 8000...");
});
