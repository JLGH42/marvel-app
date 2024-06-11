const express = require("express");
const app = express();

require("dotenv").config();
const bodyParser = require("body-parser");
// const path = require("path");
const server_port = process.env.PORT || 3001;

// const public = path.join(__dirname, "../public");
// app.use("/public", express.static(public));

/* Express serves build file created by create-react-app */
app.use(express.static("build"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./db/mongoose');
const userRoute = require("./routes/user");

app.use("/users", userRoute);

app.listen(server_port, () => {
  console.log(`Server Listening at 127.0.0.1:${server_port}`);
});
