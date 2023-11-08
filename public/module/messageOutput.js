export function messageOutput(data) {
  const promptOutput = document.getElementById("prompt-output");
  const inputRecords = data.mainContent.inputRecords;
  promptOutput.innerHTML = ""; // 메시지 출력 영역 초기화

  // map을 이용해 inputRecords 배열에 접근하여 배열의 요소들 각각에 대해 객체값에 접근하여 가져온 값과 <p>태그를 붙임으로써 추가할 컨텐츠를 새로운 배열로 생성
  // join("")으로 배열의 모든 요소를 연결해 문자열화 시켜 쉼표를 제거한후 promptOutput에 innerHTML로 할당.
  promptOutput.innerHTML = inputRecords
    .map((record) => `<p>${record.type} : ${record.message}\u00A0\u00A0\u00A0\u00A0\u00A0${record.timestamp}</p>`)
    .join("");
}
