<!--  -->
<template>
  <div class='car-detail'>
    <!-- <iframe src='http://localhost:8082' width="375" height='667'></iframe> -->
    <div class='form'>
      <div class='form-con'>
        <a-form :form="form" @submit="handleSubmit" >
            <a-divider class='dividerClass'>请选择你要配置的车款</a-divider>
            <a-form-item label="汽车品牌"  :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-select v-decorator="[ 'carBrand',{
                    rules: [{ required: true, message: `请选择汽车品牌`,whitespace:true }],
                  } ]"  @change='changeCarBrand'>
                 <a-select-option v-for='(item,index) in jsonData' :key='index' :value='item.name'>{{item.label}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="汽车型号"  :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-select v-decorator="[ 'carType',{
                    rules: [{ required: true, message: `请选择汽车型号`,whitespace:true }],
                  } ]" :disabled="jsonData1.length===0"  @change="changeCarType">
                 <a-select-option v-for='(item,index) in jsonData1' :key='index' :value='item.name'>{{item.label}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="汽车款式"  :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-select v-decorator="[ 'carStyle',{
                    rules: [{ required: true, message: `请选择汽车款式`,whitespace:true }],
                  } ]" :disabled="jsonData2.length===0" @change='changeCarStyle'>
                 <a-select-option v-for='item in jsonData2' :key='item.name'>{{item.label}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-divider class='dividerClass'>轮播展示设置</a-divider>
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
                rules: [{ required: true, message: `请输入车型标题`,whitespace:true }],
                    initialValue: formSlide.title
              }]" />
            </a-form-item>
            <a-form-item label='车型描述' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-decorator="['describle',{
                rules: [{ required: true, message: `请输入车型描述`,whitespace:true }],
                    initialValue: formSlide.describle
              }]" />
            </a-form-item>
            <a-form-item label='官方指导价' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-decorator="['price',{
                rules: [{ required: true, message: `请输入官方指导价`,whitespace:true }],
                    initialValue: formSlide.price
              }]" />
            </a-form-item>
            <a-divider class='dividerClass'>核心功能概览</a-divider>
            <a-form-item label='功能一' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-decorator="['Features[0]',{
                rules: [{ required: true, message: `功能特点一`,whitespace:true }],
                    initialValue: formSlide.Features[0]
              }]" />
            </a-form-item>
            <a-form-item label='功能二' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-decorator="['Features[1]',{
                rules: [{ required: true, message: `功能特点二`,whitespace:true }],
                    initialValue: formSlide.Features[1]
              }]" />
            </a-form-item>
            <a-form-item label='功能三' :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-decorator="['Features[2]',{
                rules: [{ required: true, message: `功能特点三`,whitespace:true }],
                    initialValue: formSlide.Features[2]
              }]" />
            </a-form-item>

            <a-divider class='dividerClass'>核心亮点设置部分</a-divider>
            <template>
              <div v-for='(item,index) in formSlide.coreLight' :key='index+"core"' style='border:3px solid #000;padding:10px;margin-top:40px'>
                <a-form-item :label="`亮点${index+1}的标题`" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                  <a-input v-decorator="[ `coreLight[${index}].title`, {
                    rules: [{ required: true, message: `请输入亮点${index+1}的标题`,whitespace:true }],
                    initialValue: item.title
                  }
                ]"
                :placeholder="`请输入亮点标题`" />
                </a-form-item>
                <div v-for='(item2,index2) in formSlide.coreLight[index].child_gird' :key='index2+"core2"' class='child-core-highlight'>
                  <a-form-item :label="`子亮点${index2+1}的标题`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="[ `coreLight[${index}].child_gird[${index2}].title`, {
                        rules: [{ required: true, message: `请输入子亮点${index2+1}的标题`,whitespace:true }],
                        initialValue: item2.title
                      }
                    ]" :placeholder="`请输入亮点子标题`" />
                  </a-form-item>
                  <div v-for='(item3,index3) in formSlide.coreLight[index].child_gird[index2].child' :key='index3+"core3"' class='child-core-highlight-graph'>
                    <a-form-item :label="`图文${index3+1}标题`" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
                      <a-input v-decorator="[ `coreLight[${index}].child_gird[${index2}].child[${index3}].title1`, {
                          rules: [{ required: true, message: `请输入图文${index3}标题`,whitespace:true }],
                          initialValue: item3.title1
                        }
                      ]"
                      :placeholder="`请输入图文标题`" />
                    </a-form-item>
                    <a-form-item :label="`HTML内容`" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
                      <a-textarea v-decorator="[ `coreLight[${index}].child_gird[${index2}].child[${index3}].html`, {
                          rules: [{ required: true, message: `请输入图文${index3}HTML内容`,whitespace:true }],
                          initialValue: item3.html
                        }
                      ]"
                      :placeholder="`请输入图文HTML内容`" :rows="4" />
                    </a-form-item>
                    <div style="position:absolute;top:10px;left:30px">
                      <a-button type="danger" size='small' @click='delGraphic(index,index2,index3)'>
                        <a-icon type="minus" />删除图文
                      </a-button>
                    </div>
                  </div>
                  <a-form-item label='   ' :label-col="{ span: 18 }" :wrapper-col="{ span: 6 }">
                    <a-button type="primary" size='small' @click='addGraphic(index,index2)' style='float:right'>
                      <a-icon type="plus" /> 增加图文
                    </a-button>
                  </a-form-item>
                  <div style="position:absolute;top:10px;left:10px">
                    <a-button type="danger" @click="delCore(index,index2)">
                      <a-icon type="minus" />删除全部图文
                    </a-button>
                  </div>
                </div>
                <a-form-item label='   ' :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-button type="primary" @click='addCore(index)'>
                      <a-icon type="plus" /> 增加子亮点
                    </a-button>
                </a-form-item>
              </div>
            </template>

            <a-form-item :wrapper-col="{ span: 12, offset: 5 }"  >
              <a-button type="primary" html-type="submit" block size='large' style='marginTop:10px'> 保存 </a-button>
            </a-form-item>
          </a-form>
      </div>
    </div>
    <div class='preview'>
      <div class='previewCon'>
        <div>
          <iframe src='' width="375" height='667' frameborder='0'></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonData from '../../mock/json/get.js'
console.log(jsonData)
export default {
  name: 'basic_form2',
  data () {
    return {
      page_category_id: '',
      page_tags_id: '', // 车牌 车型 车款 id的逗号连接 str
      page_tags_id_style: '', // 车款对应的tag id
      templateId: '', // 模板id
      page_tas: '',
      jsonData,
      jsonData1: [],
      jsonData2: [],
      indexCarBrand: 0,
      indexCarType: 0,
      carBrand: '',
      carType: '',
      carStyle: '',
      formSlide: {
        images: [''],
        title: '',
        describle: '',
        price: '',
        Features: ['', '', ''],
        coreLight: [
          {
            title: '',
            child_gird: [
              // {
              //   title: '亮点一 全尺寸7座出行空间',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // },
              // {
              //   title: '亮点一 全尺寸7座出行空间2',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // }
            ]
          },
          {
            title: '',
            child_gird: [
              // {
              //   title: '亮点二 全尺寸7座出行空间',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // }
            ]
          },
          {
            title: '',
            child_gird: [
              // {
              //   title: '亮点三 全尺寸7座出行空间',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // }
            ]
          }
        ]
      },
      backformSlide: {
        images: [''],
        title: '',
        describle: '',
        price: '',
        Features: ['', '', ''],
        coreLight: [
          {
            title: '',
            child_gird: [
              // {
              //   title: '亮点一 全尺寸7座出行空间',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // },
              // {
              //   title: '亮点一 全尺寸7座出行空间2',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // }
            ],
            active: false
          },
          {
            title: '',
            child_gird: [
              // {
              //   title: '亮点二 全尺寸7座出行空间',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // }
            ],
            active: false
          },
          {
            title: '',
            child_gird: [
              // {
              //   title: '亮点三 全尺寸7座出行空间',
              //   child: [
              //     { title1: '乘坐空间', html: 'a', active: false },
              //     { title1: '储物空间', html: 'bbbb', active: false },
              //     { title1: '全景大天窗', html: 'ccc', active: false }
              //   ]
              // }
            ],
            active: false
          }
        ]
      },
      tempalteLoading: null,
      saveLoading: null
    }
  },
  computed: {
    imageLength () {
      return this.formSlide.images.length > 1
    }
  },
  mounted () {
    this.getCategoryId()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    getTemplateData () { // 请求模板数据
      const hide = this.$message.loading('车型模板数据请求中...', 0)
      // let url = `http://rdss-dev-1232799807.cn-north-1.elb.amazonaws.com.cn:9001/wordpress/index.php/wp-json/wp/v2/media?categories=${}&tags=${}`
      this.axios.get(`wordpress/index.php/wp-json/wp/v2/media?categories=${this.page_category_id}&tags=${this.page_tags_id_style}`)
        .then(resAll => {
          let res = resAll.data
          if (res.length === 0) {
            this.$message.success('该车款暂无配置信息，请配置')
            setTimeout(hide, 0)
            this.formSlide = this.backformSlide
            this.templateId = ''
            return
          }
          let lastRes = res[res.length - 1] // source_url
          // console.log(res, 'VVV')
          this.templateId = lastRes.id

          this.axios.get(lastRes.source_url).then((resAll) => {
            let resTxt = resAll.data
            this.formSlide = JSON.parse(resTxt.file)
            setTimeout(hide, 0)
          })
        }).catch(err => {
          setTimeout(hide, 2500)
          this.$message.success('数据请求错误，请重试')
          this.formSlide = this.backformSlide
          console.log(err)
        })
    },
    getTagsIds (carbrand, carType, carStyle) {
      // this.tempalteLoading = this.$message.loading('Action in progress..', 0)
      this.$store.dispatch('getTag').then((res) => {
        console.log(res, carbrand, carType, carStyle)
        let arrId = []
        res.forEach(item => {
          console.log(item)
          if (item.name === carbrand) {
            arrId.push(item.id)
            console.log(item.id, '_________carbrand')
          }
          if (item.name === carType) {
            arrId.push(item.id)
            console.log(item.id, '_________carType')
          }
          if (item.name === carStyle) {
            arrId.push(item.id)
            this.page_tags_id_style = item.id
            console.log(item.id, '_________carStyle')
          }
          this.page_tags_id = arrId.join(',')
        })
      }).then((res) => {
        console.log('开始请求模板数据')
        if (this.page_category_id && this.page_tags_id_style) {
          this.getTemplateData()
        } else {
          this.$message.error('车型车款参数选择错误，请重试')
        }
      })
    },
    getCategoryId () { // 获取 page_category_id的值
      this.$store.dispatch('getCategory').then((res) => {
        res.some(item => {
          if (item.slug === 'derivative') {
            this.page_category_id = item.id
          }
          return item.slug === 'derivative'
        })
      })
    },
    changeCarBrand (carbrand, vnode) {
      this.carBrand = carbrand
      this.form.setFieldsValue({ carType: '' })
      this.form.setFieldsValue({ carStyle: '' })
      if (carbrand) {
        this.indexCarBrand = vnode.key
        this.jsonData1 = jsonData[vnode.key].nameplate
      } else {
        this.indexCarBrand = ''
        this.jsonData1 = []
      }
      this.jsonData2 = []
    },
    changeCarType (carType, vnode) {
      this.carType = carType
      this.form.setFieldsValue({ carStyle: '' })
      if (carType) {
        this.jsonData2 = jsonData[this.indexCarBrand].nameplate[vnode.key].derivates
      } else {
        this.jsonData2 = []
      }
    },
    changeCarStyle (carStyle) {
      this.carStyle = carStyle
      if (carStyle) {
        console.log(this.carBrand, '|', this.carType, '|', this.carStyle)

        this.page_tags_id_style = ''
        this.page_tags_id = ''
        this.getTagsIds(this.carBrand, this.carType, this.carStyle)
      }
    },
    getTasByCarStyle () {
      console.log()
    },
    delGraphic (index, index2, index3) {
      let newValue = JSON.parse(JSON.stringify(this.formSlide.coreLight.concat()))
      newValue[index].child_gird[index2].child.splice(index3, 1)
      this.$set(this.formSlide, 'coreLight', newValue)
    },
    addGraphic (indexCore, indexGrid) {
      /**
       *indexCore 第几个亮点下的
       *indexGraphic 第几个图文grid
       */
      let newValue = JSON.parse(JSON.stringify(this.formSlide.coreLight.concat()))
      if (newValue[indexCore].child_gird[indexGrid].child === undefined) {
        newValue[indexCore].child_gird[indexGrid].child = []
      }
      newValue[indexCore].child_gird[indexGrid].child.push({ title1: '图文标题', html: '图文内容', active: false })
      this.$set(this.formSlide, 'coreLight', newValue)
    },
    delCore (index, index2) { // 删除一个gird下的所有图文
      let newValue = JSON.parse(JSON.stringify(this.formSlide.coreLight.concat()))
      newValue[index].child_gird.splice(index2, 1)
      this.$set(this.formSlide, 'coreLight', newValue)
    },
    addCore (index) {
      // console.log(this.formSlide.coreLight)
      let newValue = JSON.parse(JSON.stringify(this.formSlide.coreLight.concat()))
      if (newValue[index].child_gird === undefined) {
        newValue[index].child_gird = []
      }
      // console.log(newValue)
      newValue[index].child_gird.push({ title: '', child: [], active: false })
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
        return
      }
      let newVal = images.filter((key) => key !== item)
      if (newVal.length === 0) {
        newVal = ['']
      }
      this.$set(this.formSlide, 'images', newVal)
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
          console.log(values, '？')
          let Pdata = JSON.stringify(values)
          this.putfile(Pdata)
        }
      })
    },
    putTag () {

    },
    // putData (Pdata) { // 先上传文件数据，再修改tag数据
    //   // let jsonFileName = this.carBrand + '_' + this.carType + '_' + this.carStyle + 'cardetail'
    //   let formData = new FormData()
    //   // formData.append('categories', '3')
    //   // formData.append('tags', '17,13')
    //   formData.append('file', Pdata)

    //   // let options = {
    //   //   method: 'post',
    //   //   url: '/api/index.php/wp-json/wp/v2/media',
    //   //   // mode:'cors',
    //   //   headers: {
    //   //     'Content-Disposition': 'attachment;filename=aaaa.txt',
    //   //     'Content-Type': 'multipart/form-data'
    //   //   },
    //   //   // timeout: 3600,
    //   //   // `withCredentials` indicates whether or not cross-site Access-Control requests
    //   //   // should be made using credentials
    //   //   withCredentials: true, // default: false

    //   //   // `data` is the data to be sent as the request body
    //   //   // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    //   //   data: formData
    //   // }
    //   console.log(formData, '???')
    //   this.axios.post('/api/wordpress/index.php/wp-json/wp/v2/media', {
    //   },
    //   {
    //     headers: {
    //       'Content-Disposition': `attachment;filename=${'ddd'}.txt`,
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     data: formData
    //   }
    //   ).then(res => {
    //     console.log('res', 'succcccc')
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    putfile (Pdata) { // 上传模板数据
      let jsonTemplateName = this.carBrand + '_' + this.carType + '_' + this.carStyle + 'cardetail_' + (new Date()).getTime()
      this.saveLoading = this.$message.loading('数据保存中...', 0)
      if (this.templateId) {
        this.axios.delete(`http://rdss-dev-1232799807.cn-north-1.elb.amazonaws.com.cn:9001/wordpress/index.php/wp-json/wp/v2/media/${this.templateId}?force=true`).then(() => {
          this.axios.post('/wordpress/index.php/wp-json/wp/v2/media/', { 'file': Pdata },
            {
              headers: { 'Content-Disposition': `attachment;filename=${jsonTemplateName}.txt` }
            })
            .then(resAll => {
              let res = resAll.data
              console.log('json文件数据保存成功，开始给文件加tag')
              this.templateId = res.id
              this.setFileTag(res.id)
            }).catch(err => {
              setTimeout(this.saveLoading, 0)
              this.$message.error('数据保存失败') // 这里已经把文件删了
              console.log(err)
            })
        })
      } else {
        this.axios.post('/wordpress/index.php/wp-json/wp/v2/media/', { 'file': Pdata },
          {
            headers: { 'Content-Disposition': `attachment;filename=${jsonTemplateName}.txt` }
          })
          .then(res => {
            console.log('json文件数据保存成功，开始给文件加tag')
            this.templateId = res.id
            this.setFileTag(res.id)
          }).catch(err => {
            setTimeout(this.saveLoading, 0)
            this.$message.error('数据保存失败')
            console.log(err)
          })
      }
    },
    setFileTag (id) { // 设置模板的category和tags
      // let jsonTemplateName = this.carBrand + '_' + this.carType + '_' + this.carStyle + 'cardetail_' + (new Date()).getTime()
      // categories: '3', tags: '17,13' 应该动态获取值axios
      this.axios.post('/wordpress/index.php/wp-json/wp/v2/media/' + id, { categories: this.page_category_id, tags: this.page_tags_id })
        .then(resAll => {
          console.log('tag设置完成')
          setTimeout(this.saveLoading, 0)
          this.$message.success('数据保存成功')
        }).catch(err => {
          console.log(err)
          setTimeout(this.saveLoading, 0)
          this.$message.error('数据保存失败')
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

  .dividerClass{
    font-weight: 600px;
    font-size: 24px;
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

  .child-core-highlight{
    border:1px solid blue;
    position: relative;
    padding:5px;margin-top:20px
  }
  .child-core-highlight-graph{
    border:1px solid #eee;
    padding:2px;
    margin-left:80px;
    margin-bottom:10px;
    position: relative;
  }
</style>
