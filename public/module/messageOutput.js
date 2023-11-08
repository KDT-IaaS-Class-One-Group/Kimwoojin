export function messageOutput(data) {
  const promptOutput = document.getElementById("prompt-output");
  const inputRecords = data.mainContent.inputRecords;
  promptOutput.innerHTML = ""; // 메시지 출력 영역 초기화
  inputRecords.forEach((record) => {
    const newMessage = document.createElement("p");
    newMessage.textContent = `${record.type} : ${record.message}\u00A0\u00A0\u00A0\u00A0\u00A0${record.timestamp}`;
    promptOutput.appendChild(newMessage);
  });
}
