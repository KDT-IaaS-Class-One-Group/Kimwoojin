export function hamburgerUserInfo(data) {
  const {header, mainContent} = data;
  const {hamburgerMenu, promptInputPlaceholder} = header;
  const userInfo = mainContent.userInfo;
  const menuList = document.getElementById("menu-list");
  const promptInput = document.getElementById("prompt-input");

  /**
   *
   * @param {추가할영역의id} id
   * @param {할당할json데이터값} value
   * @result 해당 id영역에 접근해둔 json데이터의 값을 할당해주는 함수.
   */
  const userInfoText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  userInfoText("user-name", userInfo.name);
  userInfoText("user-status", userInfo.status);
  userInfoText("user-avatar", userInfo.avatar);

  promptInput.placeholder = promptInputPlaceholder;

  // map을 이용해 json파일의 hamburgerMenu 배열의 요소들 각각에 대해 li태그를 붙여주고 그 값들로 새로운 배열을 만듬.
  // join("")으로 배열의 모든 요소를 연결해 문자열로 만들어서 쉼표를 제거.
  // 해당 문자열을 햄버거메뉴의 ul에 할당한다.
  menuList.innerHTML = hamburgerMenu.map((menuText) => `<li>${menuText}</li>`).join("");

  let hamburgerButton = document.getElementById("hamburger-button");
  hamburgerButton.textContent = header.logo;

  let hamburger = document.querySelector(".hamburger");
  hamburgerButton.addEventListener("click", () => {
    hamburger.classList.toggle("open");
  });
}
