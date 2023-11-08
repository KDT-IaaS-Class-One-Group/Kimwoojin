import {hamburgerUserInfo} from "./module/hamburgerUserInfo.js";
import {style} from "./module/style.js";
import {messageOutput} from "./module/messageOutput.js";
import {getCurrentTimestamp} from "./module/getCurrentTimestamp.js";
import {viewFetch} from "./module/viewFetch.js";

const form = document.getElementById("inputs");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const sendData = document.getElementById("send");
sendData.addEventListener("click", () => {
  const messageType = document.getElementById("message-type").value;
  const inputMessage = document.getElementById("prompt-input").value;
  const timestamp = getCurrentTimestamp();
  fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `type=${messageType}&message=${inputMessage}&timestamp=${timestamp}`,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("prompt-input").value = "";
      viewFetch("/main.json", messageOutput);
    });
});

viewFetch("/style.json", style);
viewFetch("/main.json", hamburgerUserInfo);
viewFetch("/main.json", messageOutput);
