const card = document.querySelector(".card");
const range = 10;

/**
 * @param {number} length 鼠标可移动的全长
 * @param {number} value 鼠标所在位置
 * @param {Array} range range取值范围
 * 通过 鼠标所在位置 比上 鼠标可移动的全长 === 返回值 比上 range取值范围
 * 为什么加range[0] 见 问题img
 */
function getRotateDeg(length, value, range, isHorizontal = false) {
  const semiLength = length / 2;
  const calcSign = value - semiLength
  let sign = calcSign  > 0 ? -1 : 1;
  if(isHorizontal) sign *= -1;
  const deg = Math.abs((value - semiLength)) / semiLength * range;
  return sign * deg;
  
  // let deg = (value - semiLength) / semiLength * range;
  // if(isHorizontal) return -deg;
  // return deg
}

card.addEventListener("mousemove", (e) => {
  const { offsetX, offsetY } = e;
  const { offsetWidth, offsetHeight } = card;
  console.log('offsetX,offsetY :>> ', offsetX,offsetY);
  // x 轴旋转靠的是 鼠标的y
  let rx = getRotateDeg(offsetWidth, offsetY, range); 
  let ry = getRotateDeg(offsetHeight, offsetX, range, true);
  card.style.setProperty("--rx", `${rx}deg`);
  card.style.setProperty("--ry", `${ry}deg`);
});

// 移出置为0
card.onmouseleave = (e) => {
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
};
