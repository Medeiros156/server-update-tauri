const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/update.json") {
    console.log("CALL");
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
  } else if (req.url.startsWith("/releases/")) {
    // Serve the binary files from the 'releases' directory
    const filePath = path.join(
      __dirname,
      "releases",
      req.url.substring("/releases/".length)
    );
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Binary file not found");
      } else {
        // Determine the correct content type based on the file extension
        const ext = path.extname(filePath);
        let contentType = "application/octet-stream";
        if (ext === ".exe")
          contentType = "application/vnd.microsoft.portable-executable";
        else if (ext === ".dmg") contentType = "application/x-apple-diskimage";
        else if (ext === ".AppImage") contentType = "application/x-executable";

        res.writeHead(200, { "Content-Type": contentType });
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
