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
const port = process.env.PORT || 4000;

https.createServer(options, app).listen(port, () => {
  console.log("HTTPS server running on port 3000");
});
