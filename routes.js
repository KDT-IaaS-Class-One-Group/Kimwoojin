const express = require("express");
const router = express.Router();
const fs = require("fs");

// JSON 파일 초기화
const jsonFilePath = "./public/main.json";
const defaultData = {
  header: {
    hamburgerMenu: ["Home", "Profile", "Settings", "Logout"],
    logo: "🌐",
    promptInputPlaceholder: "Enter your message here...",
  },
  mainContent: {
    inputRecords: [],
    userInfo: {
      name: "John Doe",
      status: "Online",
      avatar: "👤",
    },
  },
};

fs.writeFileSync(jsonFilePath, JSON.stringify(defaultData, null, 2));
console.log("JSON 파일 초기화 완료");

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

router.post("/data", (req, res) => {
  const postData = req.body.message;
  console.log(postData);

  const jsonFile = fs.readFileSync(jsonFilePath);
  const parseJsonFile = JSON.parse(jsonFile);

  // 기존 데이터를 가져와서 새로운 데이터를 추가합니다.
  const inputRecords = parseJsonFile.mainContent.inputRecords || [];
  inputRecords.push({ message: postData });
  parseJsonFile.mainContent.inputRecords = inputRecords;

  fs.writeFileSync(jsonFilePath, JSON.stringify(parseJsonFile, null, 2));

  // 응답을 보냅니다.
  res.send({ success: true });
});

module.exports = router;