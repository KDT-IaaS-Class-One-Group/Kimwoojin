const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes");
const fs = require("fs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/", router);

app.listen(8080, () => {
  console.log("http://localhost:8080/");
});
