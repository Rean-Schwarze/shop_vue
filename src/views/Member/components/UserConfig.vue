<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type {UploadInstance, UploadProps, UploadUserFile} from 'element-plus'
import {useUserStore} from "@/stores/user.js";
import {useDialog} from "@/composables/useDialog.js";
import CommonDialog from "@/components/dialog/CommonDialog.vue";
import {ElMessage} from "element-plus";
import {uploadAvatarAPI} from '@/apis/user.js';
const userStore=useUserStore()

// 表单校验（账号名、密码）
// 1. 准备表单对象
const form=ref({
  account:userStore.userInfo?.account,
  nickname:userStore.userInfo?.nickname,
})
const formRef=ref(null)
// 2. 准备规则对象
const rules={
  account:[
    {pattern:/[^^#*%&',;=?\s$\x22]+/,message:'不能含有非法字符',trigger:'blur'}
  ],
  nickname:[
    {pattern:/[^^#*%&',;=?\s$\x22]+/,message:'不能含有非法字符',trigger:'blur'}
  ]
}

// 头像上传
const uploadRef = ref<UploadInstance>()
const imgList=ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(imgList)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const handleExceed: UploadProps['onExceed'] = () => {
  ElMessage.warning(
      "只能上传一张图片，请删除后重试！"
  )
}
const beforeAvatarUpload:UploadProps['beforeUpload']=(rawFile)=>{
  if (rawFile.type !== 'image/jpeg' && rawFile.type!=='image/png') {
    ElMessage.error('图片必须是.jpg/.png格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('图片大小必须小于1MB！')
    return false
  }
  return true
}

// 自定义弹窗
const {
  visible,
  openDialog,
  closeDialog,
}=useDialog()

const handleConfirm = () => {
  uploadRef.value!.submit()
  closeDialog();
};

const imgUpload=async (info)=>{
  const { file } = info
  // this.file = file
  const formData = new FormData()
  formData.append('file', file)
  const res=await uploadAvatarAPI(formData);
  if(res.code===1){
    ElMessage.success("上传成功！")
    userStore.userInfo.avatar=res.result.url
  }
  else{
    ElMessage.error(res.message)
  }
}

const handleClose = () => {
  closeDialog();
};
</script>

<template>
<div class="home-panel">
  <div class="header">
    <h4>编辑资料</h4>
  </div>
  <div class="avatar">
    <el-avatar class="icon" :src="userStore.userInfo?.avatar"></el-avatar>
  </div>
  <el-button size="large" class="avatar-btn" @click="openDialog">修改头像</el-button>
  <CommonDialog title="修改头像" :hidden-full-btn="true" v-model="visible"
                @confirm="handleConfirm" @close="handleClose">
    <el-upload class="avatar-upload" ref="uploadRef"
        accept=".jpg, .jpeg, .png, .bmp"
        :http-request="imgUpload"
        :limit="1"
        v-model:file-list="imgList"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :auto-upload="false"
        :before-upload="beforeAvatarUpload"
        :on-exceed="handleExceed"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <div class="el-upload__tip" style="text-align: center;">格式：.jpg/.png</div>
    <div class="el-upload__tip" style="text-align: center;">大小不超过1MB</div>
  </CommonDialog>
  <el-dialog v-model="dialogVisible" title="图片预览">
    <img class="avatar-btn" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <div class="form">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100px"
             status-icon>
      <el-form-item prop="account" label="用户名">
        <el-input size="large" v-model="form.account"/>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input size="large" v-model="form.nickname"/>
      </el-form-item>
    </el-form>
  </div>
  <el-button size="large" class="avatar-btn">保存</el-button>
</div>
</template>

<style scoped lang="scss">
.home-panel {
  background-color: #fff;
  padding: 0 30px;
  margin-top: 10px;
  height: 500px;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h4 {
      font-size: 22px;
      font-weight: 400;
    }

  }

  .avatar{
    padding-top: 50px;
    display: flex;
    align-items: center;
    margin: auto;

    .icon{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin: auto;
      cursor: pointer;
    }
  }

  .avatar-btn{
    display: flex;
    align-items: center;
    margin: 20px auto;
  }

  .avatar-upload{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }

  .form{
    //display: flex;
    align-items: center;
    margin-top: 20px;
    margin-right: 60px;
  }
}
</style>
