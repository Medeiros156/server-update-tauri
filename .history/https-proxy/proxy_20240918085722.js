const https = require("https");
const httpProxy = require("http-proxy");
const fs = require("fs");
const path = require("path");

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

// Create a proxy server
const proxy = httpProxy.createProxyServer({
  target: "http://localhost:8080", // Replace with your HTTP API endpoint
  changeOrigin: true,
});

// Create an HTTPS server
https
  .createServer(sslOptions, (req, res) => {
    // Proxy the request to the HTTP API
    proxy.web(req, res, (error) => {
      if (error) {
        console.error("Proxy error:", error);
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    });
  })
  .listen(8443, () => {
    console.log("HTTPS server running on port 8443");
  });
