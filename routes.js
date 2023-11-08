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
  const type = req.body.type;
  const message = req.body.message;
  const timestamp = req.body.timestamp;

  const jsonFilePath = "./public/main.json";
  const jsonFile = fs.readFileSync(jsonFilePath);
  const parseJsonFile = JSON.parse(jsonFile);

  // 논리연산자 ||를 이용해 첫 피연산자의 값이존재(true)하면 그 값을 사용하고 아니면 빈 배열을 사용한다.
  const input = parseJsonFile.mainContent.inputRecords || [];
  // req.body로 받은 type, message, timestamp를 값으로 갖는 객체를 inputRecords 배열에 추가한다.
  input.push({type, message, timestamp});
  // 객체로 파싱된 json파일의 inputRecords에 input 값을 업데이트한다.
  parseJsonFile.mainContent.inputRecords = input;

  // 업데이트된 객체 내용을 json문자열로 변환하여 해당 경로에 파일을 다시 써준다.
  fs.writeFileSync(jsonFilePath, JSON.stringify(parseJsonFile, null, 2));

  res.send({success: true});
});
module.exports = router;
