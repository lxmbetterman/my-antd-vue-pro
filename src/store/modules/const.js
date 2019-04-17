// 全局常量数据
import {
  axios
} from '../../axios/request'
const layout = {
  state: {
    imgae_tags: [
      { name: '车型详情相关图片', value: 'car_detail_image' },
      { name: '首页相关图片', value: 'index_image' },
      { name: '其他类型图片', value: 'else_image' }
    ],
    imgae_tags_label: {
      car_detail_image: '车型详情相关图片',
      index_image: '首页相关图片',
      else_image: '其他类型图片'
    },
    all_category: [], // 全部的category分类 项目加载时初始化
    all_tags: []
  },
  mutations: {
    SETCATEGORY (state, val) {
      state.all_category = val
    },
    SETTAGS (state, val) {
      state.all_tags = val
    }
  },
  actions: {
    getCategory ({ commit }, val) {
      return new Promise((resolve, reject) => {
        axios.get('/wordpress/index.php/wp-json/wp/v2/categories?fields=id,name,slug,description', {
        }).then((resAll) => {
          let res = resAll.data
          commit('SETCATEGORY', res)
          resolve(res)
        }).catch(() => {

        })
      })
    },
    getTag ({ commit, state }, val) {
      return new Promise((resolve, reject) => {
        if (state.all_tags.length > 1) {
          resolve(state.all_tags)
        } else {
          axios.get('/wordpress/index.php/wp-json/wp/v2/tags?fields=id,name,slug,description', {}).then((resAll) => {
            let res = resAll.data
            commit('SETTAGS', res)
            resolve(res)
          }).catch(() => {

          })
        }
      })
    }
  }
}
export default layout
