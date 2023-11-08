const form = document.getElementById("inputs");
const promptOutput = document.getElementById("prompt-output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const sendData = document.getElementById("send");

sendData.addEventListener("click", () => {
  const messageType = document.getElementById("message-type").value;
  const inputMessage = document.getElementById("prompt-input").value;
  const timestamp = getCurrentTimestamp();

  // 데이터를 서버로 보냅니다.
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

function getCurrentTimestamp() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // 시간을 12시간 형식으로 변환
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 *
 * @param {json파일의경로} url
 * @param {실행할기능함수} callback
 * @return fetch로 받을 json데이터를 이용해 실행 할 함수반환
 */

function viewFetch(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
}

function style() {
  const colors = data.colors;
  const fonts = data.fonts;
  // 동적으로 스타일 적용
  document.body.style.backgroundColor = colors.background;
  document.body.style.color = colors.text;
  document.body.style.fontFamily = fonts.main;
}
function messageOutput(data) {
  const inputRecords = data.mainContent.inputRecords;
  promptOutput.innerHTML = ""; // 메시지 출력 영역 초기화
  inputRecords.forEach((record) => {
    const newMessage = document.createElement("p");
    newMessage.textContent = `${record.type} : ${record.message}\u00A0\u00A0\u00A0\u00A0\u00A0${record.timestamp}`;
    promptOutput.appendChild(newMessage);
  });
}
function hamburgerUserInfo(data) {
  const {header, mainContent} = data;
  const {hamburgerMenu, promptInputPlaceholder} = header;
  const userInfo = mainContent.userInfo;
  const menuList = document.getElementById("menu-list");
  const promptInput = document.getElementById("prompt-input");

  const userInfoText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  userInfoText("user-name", userInfo.name);
  userInfoText("user-status", userInfo.status);
  userInfoText("user-avatar", userInfo.avatar);

  promptInput.placeholder = promptInputPlaceholder;

  hamburgerMenu.forEach((menuText) => {
    const menuItem = document.createElement("li");
    menuItem.textContent = menuText;
    menuList.appendChild(menuItem);
  });

  let hamburgerButton = document.getElementById("hamburger-button");
  hamburgerButton.textContent = header.logo;

  let hamburger = document.querySelector(".hamburger");
  hamburgerButton.addEventListener("click", () => {
    hamburger.classList.toggle("open");
  });
}

viewFetch("/style.json", style);
viewFetch("/main.json", hamburgerUserInfo);
