<!--  -->
<template>
  <div class='car-detail'>
    <!-- <iframe src='http://localhost:8082' width="375" height='667'></iframe> -->
    <div class='form'>
      <div class='form-con'>
        <a-form id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-divider>slide部分相关设置</a-divider>
            <a-form-item v-for='(item,index) in formSlide.images' :key='index' :label="`请输入图片${index+1}的链接`"
                           :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input
                v-decorator="[
                  `images[${index}]`,
                  {
                    rules: [{ required: true, message: `请输入图片${index+1}的链接`,whitespace:true }],
                    initialValue: item
                  }
                ]"
                :placeholder="`请输入图片链接`"
                style="width: 90%; margin-right: 8px" />
                <!-- <span  v-if="imageLength" @click="test(index)">-{{imageLength}}</span> -->
                <a-icon v-if="imageLength"
                        class="dynamic-delete-button"
                        type="minus-circle-o"
                        @click="() => deleteItem(item)"
                />
            </a-form-item>
            <a-form-item label='   ' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-button type="dashed" @click="add">
                <a-icon type="plus" /> 增加图片地址
              </a-button>
            </a-form-item>
            <a-form-item label='车型标题' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-decorator="['title',{
                rules: [{ required: true, message: `请输入slider标题`,whitespace:true }],
                    initialValue: formSlide.title
              }]" />
            </a-form-item>
            <a-form-item label='官方指导价' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-decorator="['price',{
                rules: [{ required: true, message: `请输入官方指导价`,whitespace:true }],
                    initialValue: formSlide.price
              }]" />
            </a-form-item>
            <a-divider>核心亮点设置部分</a-divider>
            <template>
              <div v-for='(item,index) in formSlide.coreLight' :key='index+"core"' style='border:1px solid #ddd;padding:10px;margin-top:40px'>
                <a-form-item :label="`亮点${index+1}的标题`" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                  <a-input v-decorator="[ `coreLight[${index}].title`, {
                    rules: [{ required: true, message: `请输入亮点${index+1}的标题`,whitespace:true }],
                    initialValue: item.title
                  }
                ]"
                :placeholder="`请输入亮点标题`" />
                </a-form-item>
                <div  v-for='(item2,index2) in formSlide.coreLight[index].child_gird' :key='index2+"core2"' style='border:1px solid #ddd;padding:5px;margin-top:20px'>
                  <a-form-item :label="`子亮点${index2+1}的标题`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="[ `coreLight[${index}].child_gird[${index2}].title`, {
                      rules: [{ required: true, message: `请输入子亮点${index2+1}的标题`,whitespace:true }],
                      initialValue: item2.title
                    }
                  ]"
                  :placeholder="`请输入亮点子标题`" />
                  </a-form-item>
                  <div v-for='(item3,index3) in formSlide.coreLight[index].child_gird[index2].child' :key='index3+"core3"' style='border:1px solid #eee;padding:2px'>
                      <a-form-item :label="`图文${index3+1}标题`" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
                        <a-input v-decorator="[ `coreLight[${index}].child_gird[${index2}].child[${index3}].title1`, {
                            rules: [{ required: true, message: `请输入图文${index3}标题`,whitespace:true }],
                            initialValue: item3.title1
                          }
                        ]"
                        :placeholder="`请输入图文标题`" />
                      </a-form-item>
                      <a-form-item :label="`${index3+1}HTML内容`" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
                        <a-textarea v-decorator="[ `coreLight[${index}].child_gird[${index2}].child[${index3}].html`, {
                            rules: [{ required: true, message: `请输入图文${index3}HTML内容`,whitespace:true }],
                            initialValue: item3.html
                          }
                        ]"
                        :placeholder="`请输入图文HTML内容`" :rows="4" />
                      </a-form-item>
                  </div>
                  <a-form-item label='   ' :label-col="{ span: 18 }" :wrapper-col="{ span: 6 }">
                    <a-button type="dashed" @click='addCore(index)' style='float:right'>
                      <a-icon type="plus" /> 增加图文
                    </a-button>
                </a-form-item>
                </div>
                <a-form-item label='   ' :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-button type="dashed" @click='addCore(index)'>
                      <a-icon type="plus" /> 增加子亮点
                    </a-button>
                </a-form-item>
              </div>
            </template>

            <a-form-item :wrapper-col="{ span: 12, offset: 5 }"  >
              <a-button type="primary" html-type="submit" > 保存 </a-button>
              <a-button type="primary" @click="test" > testform </a-button>
            </a-form-item>
          </a-form>
      </div>
    </div>
    <div class='preview'>
      <div class='previewCon'>
        <div>
          <iframe src='http://localhost:8080' width="375" height='667' frameborder='0'></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formSlide: {
        images: [''],
        title: 'dsadsadas',
        price: '10000000000',
        coreLight: [
          {
            title: '亮点一',
            child_gird: [
              {
                title: '亮点一 全尺寸7座出行空间',
                child: [
                  { title1: '乘坐空间', html: 'a', active: false },
                  { title1: '储物空间', html: 'bbbb', active: false },
                  { title1: '全景大天窗', html: 'ccc', active: false }
                ]
              },
              {
                title: '亮点一 全尺寸7座出行空间2',
                child: [
                  { title1: '乘坐空间', html: 'a', active: false },
                  { title1: '储物空间', html: 'bbbb', active: false },
                  { title1: '全景大天窗', html: 'ccc', active: false }
                ]
              }
            ]
          },
          {
            title: '亮点二',
            child_gird: [
              {
                title: '亮点二 全尺寸7座出行空间',
                child: [
                  { title1: '乘坐空间', html: 'a', active: false },
                  { title1: '储物空间', html: 'bbbb', active: false },
                  { title1: '全景大天窗', html: 'ccc', active: false }
                ]
              }
            ]
          },
          {
            title: '亮点三',
            child_gird: [
              {
                title: '亮点三 全尺寸7座出行空间',
                child: [
                  { title1: '乘坐空间', html: 'a', active: false },
                  { title1: '储物空间', html: 'bbbb', active: false },
                  { title1: '全景大天窗', html: 'ccc', active: false }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    imageLength () {
      return this.formSlide.images.length > 1
    }
  },
  mounted () {

  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    addCore (index) {
      // console.log(this.formSlide.coreLight)
      let newValue = JSON.parse(JSON.stringify(this.formSlide.coreLight.concat()))
      // console.log(newValue)
      newValue[index].child_gird.push({ title: '', child: [] })
      // this.coreLight = newValue
      this.$set(this.formSlide, 'coreLight', newValue)
    },
    test () {
      this.formSlide = {
        images: ['QQQQQQ', 'PPPPPPPP', 'YYYYYYYY'],
        title: 'dsadsadasSSSSSSSSSSSSSS'
      }
    },
    deleteItem (item) {
      // console.log(this.form.getFieldValue('images').length, '>>>')
      // this.$set()
      // debugger

      const { form } = this
      // can use data-binding to get
      const images = form.getFieldValue('images')
      // We need at least one passenger
      if (images.length === 1) {
        console.log(1111)
        return
      }
      this.$set(this.formSlide, 'images', images.filter((key) => key !== item))
      /// form.setFieldsValue({ images: images.filter((key) => key !== item) })
    },
    add () {
      const { form } = this
      // can use data-binding to get
      const images = form.getFieldValue('images')
      // We need at least one passenger
      // console.log(images, images.concat(['']))
      this.$set(this.formSlide, 'images', images.concat(['']))
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .car-detail{
    display: flex;
    align-content: stretch;
    .form{
      flex:auto;
      height:auto;
      .form-con{
        padding: 10px 5px;
      }
    }
    .preview{
      flex:0 0 420px;
      // background-color: #aaa;
      .previewCon{
        display: flex;
        width: 375px;
        height: 667px;
        margin: 0 auto;
        top:130px;
        right: 39px;
        z-index: 100;
        position: fixed;
        border-radius: 5px;
        overflow: hidden;
        border: 3px solid #ddd;
        //background-color: red;
      }

    }
  }

  //form
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all .3s;
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
