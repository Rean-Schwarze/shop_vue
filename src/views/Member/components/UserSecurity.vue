<script setup>
import {ref} from "vue";
import {useUserStore} from "@/stores/user.js";
import {useCountDown} from "@/composables/useCountDown.js";

const userStore=useUserStore()
const {formatTimeSecond,startWithTimeout}=useCountDown()
// 表单校验（账号名、密码）
// 1. 准备表单对象
const form=ref({
  phone:userStore.userInfo.phone,
  password:"",
  email:userStore.userInfo.email,
})
const confirmForm=ref({
  phoneCode:'',
  emailCode:'',
  phone:'',
  email:'',
  password:'',
  confirmPassword:''
})
const formRef=ref(null)
// 2. 准备规则对象
const rules={
  phone:[
    {required:true,message:'手机号不能为空',trigger:'blur'},
    {pattern:/^\d{11}$/,message:'手机号必须是11位数字',trigger:'blur'}
  ],
  password:[
    {required:true,message:'密码不能为空',trigger:"blur"},
    {min:6,max:14,message:'密码长度为6~14字符',trigger:"blur"}
  ],
  email:[
    {required:true,message:"邮箱不能为空",trigger:"blur"},
    {pattern:/@[A-Za-z0-9]+.[A-Za-z]+$/,message:"邮箱格式错误",trigger:"blur"}
  ],
  phoneCode:[
    // {required:true,message:'验证码不能为空',trigger:"blur"},
    {pattern:/[^^#*%&',;=?\s$\x22]+/,message:'不能含有非法字符',trigger:'blur'}
  ],
  emailCode:[
    // {required:true,message:'验证码不能为空',trigger:"blur"},
    {pattern:/[^^#*%&',;=?\s$\x22]+/,message:'不能含有非法字符',trigger:'blur'}
  ],
  confirmPassword:[
    {required:true,message:'密码不能为空',trigger:"blur"},
    {
      validator:(rule,value,callback)=>{
        // rule:自定义校验逻辑
        // value:当前输入的数据
        // callback:校验处理函数，校验通过时调用

        if(value===confirmForm.value.password){
          callback()
        }
        else{
          callback(new Error('两次输入密码须一致！'))
        }
      }
    }
  ]
}

// 控制弹框打开
const showPhoneDialog=ref(false)
const showPhoneCode=ref(true)
const showEmailDialog=ref(false)
const showEmailCode=ref(true)
const showPasswordDislog=ref(false)

const getPhoneCode=()=>{
  showPhoneCode.value=false
  startWithTimeout(10,showPhoneCode)
}
const confirmPhoneCode=()=>{
  showPhoneDialog.value=false
}

const getEmailCode=()=>{
  showEmailCode.value=false
  startWithTimeout(10,showEmailCode)
}
const confirmEmailCode=()=>{
  showEmailDialog.value=false
}

const confirmPassword=()=>{
  formRef.value.validate(async (vaild)=>{
    if(vaild){
      showPasswordDislog.value=false

    }
  })
}
</script>

<template>
  <div class="home-panel">
    <div class="header">
      <h4>安全管理</h4>
    </div>
    <div class="form">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100px"
               status-icon>
        <el-form-item prop="phone" label="手机" :inline="true">
          <el-input size="large" style="width:80%;" v-model="form.phone"/>
          <el-button size="large" class="btn" @click="showPhoneDialog=true">修改</el-button>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input size="large" style="width:80%;" v-model="form.email"/>
          <el-button size="large" class="btn" @click="showEmailDialog=true">修改</el-button>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input size="large" style="width:80%;" v-model="form.password" show-password/>
          <el-button size="large" class="btn" @click="showPasswordDislog=true">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


  <el-dialog v-model="showPhoneDialog" title="修改手机号" width="35%" center>
    <div class="addressWrapper">
      <el-form ref="formRef" :model="confirmForm" :rules="rules" label-position="right" label-width="100px"
               status-icon>
        <el-form-item prop="phone" style="width: 85%;" label="新手机号" :inline="true">
          <el-input size="large" v-model="confirmForm.phone"/>
        </el-form-item>
        <el-form-item prop="phoneCode" style="width: 85%;" label="验证码">
          <el-input size="large" v-model="confirmForm.phoneCode" class="code"
                    placeholder="请输入验证码"
                    clearable>
            <template #suffix>
              <el-button @click="getPhoneCode" style="border: none">
                <span v-show="showPhoneCode">发送验证码</span>
                <span v-show="!showPhoneCode" class="count">{{ formatTimeSecond }} </span>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center;">暂时不支持修改~</div>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="showPhoneDialog=false">取消</el-button>
      <el-button type="primary" @click="confirmPhoneCode">确定</el-button>
    </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showEmailDialog" title="修改邮箱" width="35%" center>
    <div class="addressWrapper">
      <el-form ref="formRef" :model="confirmForm" :rules="rules" label-position="right" label-width="100px"
               status-icon>
        <el-form-item prop="email" style="width: 85%;" label="新邮箱" :inline="true">
          <el-input size="large" v-model="confirmForm.email"/>
        </el-form-item>
        <el-form-item prop="emailCode" style="width: 85%;" label="验证码" :inline="true">
          <el-input size="large" v-model="confirmForm.emailCode" class="code"
                    placeholder="请输入验证码"
                    clearable>
            <template #suffix>
              <el-button @click="getEmailCode" style="border: none">
                <span v-show="showEmailCode">发送验证码</span>
                <span v-show="!showEmailCode" class="count">{{ formatTimeSecond }} </span>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center;">暂时不支持修改~</div>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="showEmailDialog=false">取消</el-button>
      <el-button type="primary" @click="confirmEmailCode">确定</el-button>
    </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showPasswordDislog" title="修改密码" width="35%" center>
    <div class="addressWrapper">
      <el-form ref="formRef" :model="confirmForm" :rules="rules" label-position="right" label-width="100px"
               status-icon>
        <el-form-item prop="password" style="width: 85%;" label="新密码" :inline="true">
          <el-input size="large" v-model="confirmForm.password" show-password/>
        </el-form-item>
        <el-form-item prop="confirmPassword" style="width: 85%;" label="重复新密码" :inline="true">
          <el-input size="large" v-model="confirmForm.confirmPassword" show-password/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="showPasswordDislog=false">取消</el-button>
      <el-button type="primary" @click="confirmPassword">确定</el-button>
    </span>
    </template>
  </el-dialog>
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

  .avatar-btn{
    display: flex;
    align-items: center;
    margin: 20px auto;
  }

  .form{
    //display: flex;
    //align-items: center;
    margin: 20px auto;

    .btn{
      margin-left: 20px;
    }

    .text{
      font-size: 14px;
      color:$xtxColor;
      cursor: pointer;
    }
  }
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

:deep {
  .el-input__suffix {
    .el-input__suffix-inner .el-button {
      color: #00aaf8; // 修改el-button字体颜色
    }
    &-inner {
      flex-direction: row-reverse;
      -webkit-flex-direction: row-reverse;
      display: flex;
    }
  }
}

.el-form-item :deep .el-input__validateIcon {
  display: none;
}

</style>
