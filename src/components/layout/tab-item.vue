<!--  -->
<template>
  <div class='tab-container unableSelect'  >
      <a-tabs  :active-key="activePage" type="editable-card" hideAdd @change="changePage" @edit='deleteTab'>
        <a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in visitedViews">
          <span slot="tab" :pagekey="page.fullPath">{{page.title}}</span>
        </a-tab-pane>
      </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activePage: ''
    }
  },
  created () {
    // this.pageList.push(this.$route)
    this.activePage = this.$route.fullPath
  },
  // watch: {
  //   '$route': function (newRoute, oldRoute) {
  //     // this.activePage = newRoute.fullPath
  //     this.pageList.push(newRoute)
  //   }
  // }
  computed: {
    visitedViews () {
      // console.log(this.$store.state.tagsView.visitedViews)
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      this.addViewTags()
      this.activePage = newRoute.fullPath
      // this.moveToCurrentTag()
    }
    // visible (value) {
    //   if (value) {
    //     document.body.addEventListener('click', this.closeMenu)
    //   } else {
    //     document.body.removeEventListener('click', this.closeMenu)
    //   }
    // }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    deleteTab (targetKey, action) {
      let selectRoute = {}
      if (this.visitedViews.length < 2) {
        return
      }
      this.visitedViews.forEach(element => {
        if (element.fullPath === targetKey) {
          selectRoute = element
        }
      })
      this.closeSelectedTag(selectRoute)
    },
    changePage (key) {
      console.log(key)
      this.$router.push(key)
    },
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      return false
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)

            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }

            break
          }
        }
      })
    },
    refreshSelectedTag (view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/index/home')
          }
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY

      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    }
  }
}

</script>
<style lang='scss' scoped>
.tab-container{
    height: auto;
    // background-color: #f1f1f1;
    overflow: hidden;
    padding: 0 50px;
    padding-left: 30px;
    overflow: hidden;
  }
</style>
