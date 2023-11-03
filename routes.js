const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

router.post("/", (req, res) => {
  const jsonFilePath = "./public/main.json";
  const jsonFile = fs.readFileSync(jsonFilePath);
  const parseJsonFile = JSON.parse(jsonFile);
  const newObj = {message: "value"};
  parseJsonFile.mainContent.inputRecords = newObj;
  fs.writeFileSync(jsonFilePath, JSON.stringify(parseJsonFile));
});

module.exports = router;
