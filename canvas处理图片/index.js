/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('.canvas')

/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d', {
  willReadFrequently: true,
})

const img = new Image()
img.src = './img/home_role.png'
img.onload = function () {
  // img.onLoad = () => {
  canvas.width = img.width
  canvas.height = img.height
  console.log('img :>> ', img)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}


canvas.addEventListener('click', (e) => {
  let x = e.offsetX
  let y = e.offsetY
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const clickRgba = getRgba(x, y, imgData)
  let changeColor = [0, 255, 0, 255]
  let account = 1

  function _changeColor(x, y){
    account++
    if(account > 5000) return
    // 边缘判断
    let xEdge = x < 0 || x >= canvas.width
    let yEdge = y < 0 || y >= canvas.height
    if(xEdge || yEdge) return

    // 色差比较
    let curRgba = getRgba(x, y, imgData)
    // console.log('RGBA, rgbaNext :>> ', clickRgba, curRgba);
    let diffSide = diffColor(clickRgba, curRgba)
    // console.log('diffSide :>> ', diffSide);
    if(diffSide > 100) return

    let diffChange = diffColor(clickRgba, changeColor, 'change')
    if(!diffChange) return

    let idxChange = (x + y * canvas.width) * 4
    imgData.data.set(changeColor, idxChange)

    _changeColor(x, y + 1)
    _changeColor(x, y - 1)
    _changeColor(x - 1, y)
    _changeColor(x + 1, y)
  }

  _changeColor(x, y)
  ctx.putImageData(imgData, 0, 0)
  account = 1
})

function point2Index (x, y) {
  return (x + y * canvas.width) * 4
}


function getRgba (x, y, imgData) {
  let idx = point2Index(x, y)
  // console.log('point2Index :>> ', point2Index);
  // console.log('imgData :>> ', imgData);
  return {
    R: imgData.data[idx],
    G: imgData.data[idx + 1],
    B: imgData.data[idx + 2],
    A: imgData.data[idx + 3],
  }
}

const diffColor = (rgba, rgbaNext, type) => {
  let keys = Object.keys(rgba)
  if (type) {
    rgbaNext = {
      R: 0,
      G: 255,
      B: 0,
      A: 255,
    }
  }
  let diff = keys.reduce((result, item) => {
    // console.log('result :>> ', result);
    result += Math.abs(rgba[item] - rgbaNext[item])
    // console.log('item :>> ', item, rgba[item]);
    // console.log('result :>> ', result);
    return result
  }, 0)
  return diff
}