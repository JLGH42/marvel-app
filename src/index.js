const express = require("express");
const app = express();

require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const server_port = process.env.PORT || 3001;

const public = path.join(__dirname, "../public");

app.use("/public", express.static(public));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(server_port, () => {
  console.log(`Server Listening at 127.0.0.1:${port}`);
});
