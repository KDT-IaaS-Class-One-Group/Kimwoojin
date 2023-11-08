export function hamburgerUserInfo(data) {
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

  menuList.innerHTML = hamburgerMenu.map((menuText) => `<li>${menuText}</li>`).join("");

  let hamburgerButton = document.getElementById("hamburger-button");
  hamburgerButton.textContent = header.logo;

  let hamburger = document.querySelector(".hamburger");
  hamburgerButton.addEventListener("click", () => {
    hamburger.classList.toggle("open");
  });
}
