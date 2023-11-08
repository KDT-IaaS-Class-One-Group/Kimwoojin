const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes");
const fs = require("fs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// 모든경로("/")에 대한 요청을 router 미들웨어를 통해 처리하겠다는 의미이다.
app.use("/", router);

app.listen(8080, () => {
  console.log("http://localhost:8080/");
});
