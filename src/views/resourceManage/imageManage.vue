<template>
  <div>
    <div class="clearfix">
      <div style='padding:10px 50px;border:3px solid #ddd'>
        <span>选择图片所属功能模块:&nbsp;&nbsp;</span>
        <a-select v-model='iamgeTagVal' style="width: 200px" @change="handleChangeSel" allowClear>
          <a-select-option v-for="item in $store.getters.all_category" :key="item.id" :value="item.id">
            {{item.description}}
          </a-select-option>

        </a-select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a-upload name="file" :multiple="true"  :customRequest='customRequest'
        @change="handleChange" >
          <a-button type='primary' :disabled="iamgeTagVal===''">
            <a-icon type="upload" /> 点击上传图片
          </a-button>
        </a-upload>
      </div>

    </div>
    <div style='padding:10px 10px;marginTop:20px'>
      <a-form :form="form" layout="inline" @submit="handleSubmit">
      <a-form-item label="图片类型">
        <a-select v-decorator="[ 'tag' ]" placeholder="图片所属功能模块"  style="width:150px" allowClear>
          <a-select-option v-for="item in $store.getters.all_category" :key="item.id" :value="item.id">
            {{item.description}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="图片称名">
        <a-input v-decorator="[ 'titleName' ]" placeholder="图片名称" > </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" >
          <!-- getTableList(1) -->
          查询
        </a-button>

      </a-form-item>
    </a-form>
    <a-table :columns="columns" :dataSource="dataTable" :pagination="false" bordered  rowKey='id'>
        <span slot="name" slot-scope="text" >{{text}}</span>
        <span slot="source_url" slot-scope="url">{{baseUrl}}{{url}}</span>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tags" slot-scope="text">
          <!-- {{text}}
          {{$store.getters.all_category.filter(item =>item.id ===text)}} -->
          <span v-for='item in $store.getters.all_category.filter(item =>item.id ===text)' :key='item.id'>
            {{item.description}},
          </span>
        </span>
      </a-table>
      <div style="padding:20px 50px;height:60px">
        <a-pagination style='float:right' v-model="current" :total="total" @change='pageChange'/>
      </div>
    </div>
  </div>
</template>
<script>
// import reqwest from 'reqwest'
const columns = [
  {
    dataIndex: 'slug',
    title: '图片名称',
    key: 'id',
    scopedSlots: { customRender: 'name' },
    align: 'center'
  },
  {
    title: '图片地址',
    dataIndex: 'source_url',
    key: 'source_url',
    align: 'center',
    scopedSlots: { customRender: 'source_url' }
  }, {
    title: '图片格式',
    dataIndex: 'mime_type',
    key: 'mime_type',
    align: 'center',
    width: 100
  }, {
    title: '图片分类',
    dataIndex: 'tags',
    key: 'tags',
    align: 'center',
    scopedSlots: { customRender: 'tags' }
  }]

export default {
  name: 'imageManage',
  data () {
    return {

      dataTable: [],
      columns,
      iamgeTagVal: '',
      headers: {
        Authorization: 'Basic Y21zdXNlcjoxMjM0cXdlcg=='
      },
      fileList: [],
      form: this.$form.createForm(this),
      category: '',
      current: 1,
      total: 0,
      baseUrl: 'http://rdss-dev-1232799807.cn-north-1.elb.amazonaws.com.cn:9001/',
      categoryId: '',
      searchName: ''
    }
  },
  methods: {
    test (value) {
      console.log(1)
    },
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.categoryId = values.tag || ''
          this.searchName = values.titleName || ''
          this.getTableList(1)
        }
      })
    },
    handleChangeSel (value) {
      console.log(value)
      if (value === undefined) {
        this.iamgeTagVal = ''
      } else {
        this.category = value
      }
    },
    handleChange (info) {

    },
    uploadImage (file) {
    },
    customRequest (fileData) {
      let self = this
      let { file, onError, onProgress, onSuccess } = fileData
      const formData = new FormData()

      formData.append('file', file)
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('文件' + file.name + '格式不符合要求')
        return { abort () {
          console.log('upload progress is aborted.')
        } }
      }
      this.axios.post('/wordpress/index.php/wp-json/wp/v2/media', formData, {
        headers: {
          'Content-Disposition': `attachment;filename=${file.name}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round(loaded / total * 100) }, file)
        }
      })
        .then(resAll => {
          let res = resAll.data
          onSuccess()
          let ctgy = self.category
          self.addTag(res.id, ctgy)
        })
        .catch(onError)
    },
    addTag (id, categories, tags) {
      // let jsonTemplateName = this.carBrand + '_' + this.carType + '_' + this.carStyle + 'cardetail_' + (new Date()).getTime()
      // categories: '3', tags: '17,13' 应该动态获取值axios
      this.axios.post('/wordpress/index.php/wp-json/wp/v2/media/' + id, { categories, tags })
        .then(res => {
          setTimeout(this.saveLoading, 0)
          this.$message.success('数据保存成功')
        }).catch(err => {
          console.log(err)
          setTimeout(this.saveLoading, 0)
          this.$message.error('数据保存失败')
        })
    },
    getTableList (current) {
      const hide = this.$message.loading('车型模板数据请求中...', 0)
      let url = `wordpress/index.php/wp-json/wp/v2/media?categories=${this.categoryId}&page=${current}`
      if (this.searchName && this.searchName.trim()) {
        url += `&search=${this.searchName.trim()}`
      }
      this.axios.get(url).then(resAll => {
        // let res = resAll.data
        console.log(resAll.headers['x-wp-total'], 'resssssssss')
        this.total = Number(resAll.headers['x-wp-total'])
        console.log(resAll.data, '____')
        this.dataTable = resAll.data
        setTimeout(hide, 0)
      }).catch(err => {
        setTimeout(hide, 0)
        this.$message.success('数据请求错误，请重试')
        this.total = 0
        console.log(err)
      })
    },
    pageChange (page, pageSize) {
      console.log(page, pageSize)
      this.getTableList(page)
    }
  },
  mounted () {
    this.$store.dispatch('getCategory').then((res) => {
      console.log(res, 'category')
    })
    this.$store.dispatch('getTag').then((res) => {
      // console.log(res)
    })
  }
}
</script>
