const imgs = ["./img/1.png", "./img/2.png", "./img/3.jpg", "./img/4.jpg"]
// 1. 获取容器
const container = document.querySelector(".scroll-container")
let curIndex = 0
// 1.2 更换图片（滚动到顶/底，移动到底/顶）
function getPreIndex () {
  return curIndex - 1 < 0 ? imgs.length - 1 : curIndex - 1
}
function getNextIndex () {
  return curIndex + 1 >= imgs.length ? 0 : curIndex + 1
}

// 2. 创建图片
function createDiv (index) {
  let div = document.createElement("div")
  div.className = 'item'
  let img = document.createElement("img")
  img.src = imgs[index]
  div.appendChild(img)
  container.appendChild(div)
  return div
}

// 2.1 添加样式

// 3. 初始配置
function getContent () {
  container.innerHTML = ''
  let prevIndex = getPreIndex()
  let nextIndex = getNextIndex()
  let prevDiv = createDiv(prevIndex)
  createDiv(curIndex)
  let nextDiv = createDiv(nextIndex)
  prevDiv.classList.add('prev')
  nextDiv.classList.add('next')
}

// 4.监听全局滚动事件
let isTransition = false
window.addEventListener('wheel', function (e) {
  if (!e.deltaY || isTransition) return
  isTransition = true
  if (e.deltaY > 0) {
    curIndex = getNextIndex()
    container.classList.add('scroll-down')
  }
  if (e.deltaY < 0) {
    curIndex = getPreIndex()
    container.classList.add('scroll-up')
  }
})

// 6. 监听容器滚动事件，事件完成后在调用
container.addEventListener('transitionend', function () {
  container.classList.remove('scroll-up', 'scroll-down')
  isTransition = false
  getContent()
})

getContent()