export function style(data) {
  const colors = data.colors;
  const fonts = data.fonts;
  // 동적으로 스타일 적용
  document.body.style.backgroundColor = colors.background;
  document.body.style.color = colors.text;
  document.body.style.fontFamily = fonts.main;
}
