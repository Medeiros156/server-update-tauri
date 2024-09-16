const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/update.json") {
    // Serve the JSON file for app updates
    const jsonFilePath = path.join(__dirname, "update.json");
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to load update.json" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else if (req.url === "/binaries/app-binary.exe") {
    // Update the URL to match your binary's path
    // Serve the binary file
    const binaryFilePath = path.join(__dirname, "binaries", "app-binary.exe"); // Adjust the path as needed
    fs.readFile(binaryFilePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Binary file not found");
      } else {
        res.writeHead(200, { "Content-Type": "application/octet-stream" });
        res.end(data);
      }
    });
  } else {
    // Handle 404 for other routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
