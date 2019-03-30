// 用于处理屏幕在指定零界点大小变化时的回调
import enquireJs from 'enquire.js'
const enquireScreen = function (call) { // 在屏幕零界点触发
  // tablet
  const handler = {
    match: function () {
      call && call(0) // screen 小于 max 980.00px 返回 0
    },
    unmatch: function () {
      call && call(-1) // screen 大于 max 980.00px 返回 -1
    }
  }
  // mobile
  const handler2 = {
    match: () => {
      call && call(1) // 小于767.99时 返回 1
    }
  }
  enquireJs.register('screen and (max-width: 980.99px)', handler)
  enquireJs.register('screen and (max-width: 767.99px)', handler2)
}

export default enquireScreen
