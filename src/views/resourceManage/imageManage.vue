<template>
  <div>
    <div class="clearfix">
      <div style='padding:10px 50px;border:3px solid #ddd'>
        <span>选择图片分类:&nbsp;&nbsp;</span>
        <a-select v-model='iamgeTagVal' style="width: 200px" @change="handleChangeSel" allowClear>
          <a-select-option v-for="item in $store.getters.imgae_tags" :key="item.value" :value="item.value">{{item.name}}</a-select-option>

        </a-select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a-upload name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/" :headers="headers" @change="handleChange">
          <a-button type='primary' :disabled="iamgeTagVal===''">
            <a-icon type="upload" /> 点击上传图片
          </a-button>
        </a-upload>
      </div>

    </div>
    <div style='padding:10px 10px;marginTop:20px'>
      <a-form :form="form" layout="inline">
      <a-form-item label="图片类型">
        <a-select v-decorator="[ 'tag' ]" placeholder="图片类型"  style="width:150px">
          <a-select-option v-for="item in $store.getters.imgae_tags" :key="item.value" :value="item.value">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="图片称名">
        <a-input v-decorator="[ 'titleName' ]" placeholder="图片名称" > </a-input>
      </a-form-item>
      <a-form-item>
        <a-button  >
          查询
        </a-button>

      </a-form-item>
    </a-form>
    <a-table :columns="columns" :dataSource="data" :pagination="false" bordered>
        <span slot="name" slot-scope="text" class='jsClipBoard'>{{text}}</span>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tag" slot-scope="text">
          {{$store.getters.imgae_tags_label[text]}}
        </span>
      </a-table>
      <div style="padding:20px 50px;height:60px">
        <a-pagination style='float:right' v-model="current" :total="200" />
      </div>
    </div>
  </div>
</template>
<script>
// import reqwest from 'reqwest'
const columns = [{
  dataIndex: 'name',
  title: '图片名称',
  key: 'name',
  scopedSlots: { customRender: 'name' },
  align: 'center'
}, {
  title: '图片地址',
  dataIndex: 'age',
  key: 'age',
  align: 'center'
}, {
  title: '图片类型',
  dataIndex: 'tag',
  key: 'tag',
  align: 'center',
  scopedSlots: { customRender: 'tag' }
}]

const data = [{
  key: '1',
  name: 'www.aaaaaa.jpg',
  age: 32,
  tag: 'car_detail_image'
}]

export default {
  data () {
    return {
      current: 1,
      data,
      columns,
      iamgeTagVal: '',
      headers: {
        authorization: 'authorization-text'
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    test (value) {

    },
    handleChangeSel (value) {
      if (value === undefined) {
        this.iamgeTagVal = ''
      }
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>
