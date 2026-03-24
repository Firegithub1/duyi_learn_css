/** @type {HTMLCanvasElement} */
const canvasDom = document.querySelector('#user-resume-yh')

/** @type {CanvasRenderingContext2D} */
const canvas = canvasDom.getContext('2d', {
  willReadFrequently: true,
})

// 当前进度
let currentProgress = 75

console.log('canvasDom :>> ', canvasDom)
console.log('canvas :>> ', canvas)
// console.log('canvasDom.width,canvasDom.height :>> ', canvasDom.width,canvasDom.height);

// console.log('canvas.width,canvas.height :>> ', canvas.width,canvas.height);


// 绘制函数
const drawCanvas = (progressValue = 75) => {
  const width = 170
  const height = 170
  canvasDom.width = 170
  canvasDom.height = height
  console.log('canvas.canvas :>> ', canvas.canvas)
  // canvas.canvas.width = width
  // canvas.canvas.height = height
  console.log('canvas :>> ', canvas, canvas.width, canvas.height)
  const centerX = width / 2
  const centerY = height / 2
  const radius = 80
  // 边框宽度
  const progressBorderWidth = 18
  // 图片与边框的距离
  const imagePadding = 6

  // debugger
  // 清空画布
  canvas.clearRect(0, 0, width, height)

  // 设置画布背景为透明
  canvas.fillStyle = 'coral'
  // canvas.fillStyle = 'transparent'
  canvas.fillRect(0, 0, width, height)

  canvas.save() // 保存当前绘图上下文

  // 绘制背景圆环（白色底环）
  canvas.strokeStyle = '#FFFFFF' // 底色是白色
  const borderWidth = 10

  canvas.lineWidth = borderWidth // 粗细是3
  canvas.lineCap = 'butt' // 平头
  canvas.beginPath()
  // 从底部中间开始绘制完整圆环
  // canvas.arc(centerX, centerY, radius - borderWidth / 2, 1.5 * Math.PI, 1/2 * Math.PI)
  canvas.arc(centerX, centerY, 80, 1.5 * Math.PI, 1 / 2 * Math.PI)
  console.log('centerX,centerY,radius,progressBorderWidth :>> ', centerX, centerY, radius, progressBorderWidth)

  canvas.stroke()

  // 绘制进度圆环，从底部中间向左开始
  const progress = (progressValue || 0) / 100

  const gradient = canvas.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY)
  gradient.addColorStop(0, '#6DF8FF')
  gradient.addColorStop(1, '#34FFBD')

  canvas.strokeStyle = gradient
  canvas.lineWidth = progressBorderWidth
  canvas.lineCap = 'round'
  canvas.beginPath()

  // 从底部中间 (Math.PI / 2) 开始，顺时针绘制
  // canvas.arc(centerX, centerY, radius, Math.PI / 2, (progress * 2 * Math.PI) + Math.PI / 2)
  console.log('centerX,centerY,radius,progressBorderWidth :>> ', centerX, centerY, radius, progressBorderWidth)
  canvas.arc(centerX, centerY, radius - borderWidth / 2, Math.PI / 2, (progress * 2 * Math.PI) + Math.PI / 2)
  canvas.stroke()

  canvas.restore() // 恢复绘图上下文

  // 在进度结束处添加白色小圆点
  if (progress > 0) {
    // 精确计算终点角度（与 arc 一致）
    const finalAngle = Math.PI / 2 + progress * 2 * Math.PI - 0.03

    // 计算终点坐标（使用内半径）
    const endPointX = centerX + (radius - borderWidth / 2) * Math.cos(finalAngle)
    const endPointY = centerY + (radius - borderWidth / 2) * Math.sin(finalAngle)

    // 绘制小圆点
    canvas.beginPath()
    canvas.arc(endPointX, endPointY, 15, 0, 2 * Math.PI)
    canvas.fillStyle = '#34FFBD'
    canvas.fill()
  }

  // 更新文字
  // document.getElementById('percent-text').textContent = Math.round(progressValue) + '%'
}

drawCanvas()