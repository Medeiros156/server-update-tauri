const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000; // The port where the server will listen

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/update.json") {
    // Serve the update.json file
    const filePath = path.join(__dirname, "update.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
