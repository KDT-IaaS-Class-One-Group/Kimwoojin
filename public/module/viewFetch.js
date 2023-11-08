/**
 *
 * @param {json파일의경로} url
 * @param {실행할기능함수} callback
 * @return fetch로 받을 json데이터를 이용해 실행 할 함수반환
 */
export function viewFetch(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
}
