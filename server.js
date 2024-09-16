const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, HTTPS!");
});

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, app).listen(3000, () => {
  console.log("HTTPS server running on port 3000");
});
