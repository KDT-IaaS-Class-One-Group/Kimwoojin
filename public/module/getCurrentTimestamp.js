// 현재 시간을 am/pm으로 구분하여 출력하는 함수
export function getCurrentTimestamp() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 삼항조건연산자 구문. 조건이 참이면 ?바로뒤의값, 거짓이면 :뒤의 값을 반환.
  const ampm = hours >= 12 ? "PM" : "AM";

  // % 연산자는 값을 나눈후 나머지를 반환.
  // || 논리연산자는 왼쪽부터 평가해서 첫번째 피연산자가 true면 해당값을 반환하고 아니면 두번째 피연산자를 반환.
  // 나머지가 0이면 12를 반환.
  // 0은 자바스크립트에서 false로 구분되기때문에 두 번째 피연산자로 넘어감.
  // 그래서 displayHours는 24시간 중 1~12까지만 출력
  const displayHours = hours % 12 || 12;

  // padStart(length, padstring)는 문자열을 length만큼의 길이로 만들고, 빈 길이만큼 앞에 padstring을 추가해준다.
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${displayHours}:${displayMinutes} ${ampm}`;
}
