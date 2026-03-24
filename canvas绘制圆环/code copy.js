/** @type {HTMLCanvasElement} */
const canvasDom = document.querySelector('#user-resume-yh')

/** @type {CanvasRenderingContext2D} */
let canvas = canvasDom.getContext('2d', {
  willReadFrequently: true,
})

console.log('canvasDom :>> ', canvasDom);
console.log('canvas:>> ', canvas);
// import resumeBg from './resume-bg.png'

// 在 drawCanvas 函数中添加进度圆环绘制逻辑
const drawCanvas = () => {
  // const canvas = uni.createCanvasContext('')
  const width = 170
  const height = 170
  const centerX = width / 2
  const centerY = height / 2
  const radius = 80
  // 边框宽度
  const borderWidth = 3
  const progressBorderWidth = 8
  // 图片与边框的距离
  const imagePadding = 6

  canvas.setFillStyle('transparent')
  canvas.save() // 保存当前绘图上下文
  canvas.beginPath()
  // 绘制背景图
  // console.log(res)

  // 设置画布背景为透明
  canvas.fillRect(0, 0, width, height)

  // 绘制背景圆环（白色底环）
  canvas.setStrokeStyle('#FFFFFF') // 底色是白色
  canvas.setLineWidth(borderWidth) // 粗细是3
  canvas.setLineCap('butt') // 平头
  canvas.beginPath()
  // 从底部中间开始绘制完整圆环
  canvas.arc(centerX, centerY, radius - borderWidth / 2, 0, 2 * Math.PI)
  canvas.stroke()
  debugger
  // 绘制进度圆环，从底部中间向左开始
  const progress = (75 || 0) / 100
  // const progress = (userResume.value.resumePerfection || 0) / 100;

  const gradient = canvas.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY)
  gradient.addColorStop(0, '#6DF8FF')
  gradient.addColorStop(1, '#34FFBD')

  canvas.setStrokeStyle(gradient)
  canvas.setLineWidth(progressBorderWidth)
  canvas.setLineCap('round')
  return
  canvas.beginPath()

  canvas.arc(centerX, centerY, radius - borderWidth / 2, Math.PI / 2, (progress * 2 * Math.PI) + Math.PI / 2) // false 表示顺时针
  canvas.stroke()

  // 在进度结束处添加白色小圆点
  if (progress > 0) {
    // 精确计算终点角度（与 arc 一致）
    const finalAngle = Math.PI / 2 + progress * 2 * Math.PI - 0.03

    // 计算终点坐标（使用内半径）
    const endPointX = centerX + (radius - borderWidth / 2) * Math.cos(finalAngle)
    const endPointY = centerY + (radius - borderWidth / 2) * Math.sin(finalAngle)

    // 绘制小圆点
    canvas.beginPath()
    canvas.arc(endPointX, endPointY, 3, 0, 2 * Math.PI)
    canvas.setFillStyle('#ffffff')
    canvas.fill()
  }

  // 在内边框区域内绘制原始背景（再减去图片与边框的间距）
  const availableWidth = width - 2 * borderWidth - 2 * imagePadding
  const availableHeight = height - 2 * borderWidth - 2 * imagePadding

  // 保持图片比例的同时尽可能填满可用空间
  const scale = Math.min(
    availableWidth / res.width,
    availableHeight / res.height
  )

  const imgWidth = res.width * scale
  const imgHeight = res.height * scale

  // 计算图片绘制位置，使其居中
  const x = borderWidth + imagePadding + (availableWidth - imgWidth) / 2
  const y = borderWidth + imagePadding + (availableHeight - imgHeight) / 2

  canvas.drawImage(resumeBg, x, y, imgWidth, imgHeight)

  // 文字
  // canvas.setFontSize(36)
  // canvas.setFillStyle('#FF584F')
  // canvas.setTextAlign('center')
  // canvas.setTextBaseline('middle') // 垂直居中
  // canvas.font = 'bold 36px Arial'
  // canvas.fillText(`50%`, centerX, centerY - 10)
  // // canvas.fillText(`${userResume.value.resumePerfection}%`, centerX, centerY - 10)

  // canvas.setFontSize(14)
  // canvas.setFillStyle('#1A2B3E')
  // canvas.setTextAlign('center')
  // canvas.setTextBaseline('middle') // 垂直居中
  // canvas.font = 'normal 14px Arial'
  // canvas.fillText('简历评分', centerX, centerY + 20) // 相对于百分比文字向下偏移
  // canvas.draw()
}


drawCanvas()
