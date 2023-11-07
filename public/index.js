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
      messageOutput();
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

function messageOutput() {
  fetch("/main.json")
    .then((response) => response.json())
    .then((data) => {
      const inputRecords = data.mainContent.inputRecords;

      promptOutput.innerHTML = ""; // 메시지 출력 영역 초기화

      inputRecords.forEach((record) => {
        const newMessage = document.createElement("p");
        newMessage.textContent = `${record.type} : ${record.message}\u00A0\u00A0\u00A0\u00A0\u00A0${record.timestamp}`;
        promptOutput.appendChild(newMessage);
      });
    });
}

function hamburgerUserInfo() {
  fetch("/main.json")
    .then((response) => response.json())
    .then((data) => {
      const header = data.header;
      const userInfo = data.mainContent.userInfo;
      const hamburgerMenu = header.hamburgerMenu;
      const promptInputPlaceholder = header.promptInputPlaceholder;
      const menuList = document.getElementById("menu-list");
      const promptInput = document.getElementById("prompt-input");
      const userName = document.getElementById("user-name");
      const userStatus = document.getElementById("user-status");
      const userAvatar = document.getElementById("user-avatar");

      userName.textContent = userInfo.name;
      userStatus.textContent = userInfo.status;
      userAvatar.textContent = userInfo.avatar;

      promptInput.placeholder = promptInputPlaceholder;

      hamburgerMenu.forEach((menuText, index) => {
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
    });
}
hamburgerUserInfo();

fetch("/style.json")
  .then((response) => response.json())
  .then((data) => {
    const colors = data.colors;
    const fonts = data.fonts;

    // 동적으로 스타일 적용
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    document.body.style.fontFamily = fonts.main;
  });
