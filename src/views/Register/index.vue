<script setup>
import {ref} from "vue";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useRouter} from "vue-router";
import {registerAPI} from "@/apis/user.js";
// import { regionData, codeToText } from 'element-china-area-data'


// 表单校验（账号名、密码）
// 1. 准备表单对象
const form=ref({
  account:'',
  phone:'',
  password:'',
  agree:false,
  nickName:'',
  // receiver:'',
  // contact:'',
  // address:'',
  email:'',
})
// 2. 准备规则对象
const rules={
  account:[
    {pattern:/[^^#*%&',;=?\s$\x22]+/,message:'不能含有非法字符',trigger:'blur'}
  ],
  phone:[
    {required:true,message:'手机号不能为空',trigger:'blur'},
    {pattern:/^\d{11}$/,message:'手机号必须是11位数字',trigger:'blur'}
  ],
  password:[
    {required:true,message:'密码不能为空',trigger:"blur"},
    {min:6,max:14,message:'密码长度应为6~14字符',trigger:"blur"}
  ],
  email:[
    {required:true,message:"邮箱不能为空",trigger:"blur"},
    {pattern:/@[A-Za-z0-9]+.[A-Za-z]+$/,message:"邮箱格式错误",trigger:"blur"}
  ],
  agree:[
    {
      validator:(rule,value,callback)=>{
        // rule:自定义校验逻辑
        // value:当前输入的数据
        // callback:校验处理函数，校验通过时调用

        if(value){
          callback()
        }
        else{
          callback(new Error('请勾选协议'))
        }
      }
    }
  ],
  receiver:[
    {pattern:/[^^#*%&',;=?\s$\x22]+/,message:'不能含有非法字符',trigger:'blur'}
  ],
  contact:[
    {pattern:/^\d{11}$/,message:'手机号必须是11位数字',trigger:'blur'}
  ],
  address:[
    {pattern:/[^^#*%&',;=?\s$\x22]+/,message:'不能含有非法字符',trigger:'blur'}
  ]
}
// 3. 获取form实例做统一校验
const formRef=ref(null)
const router=useRouter()
const result=ref({})

// 省市区选择
// const options = ref(regionData)
// const selectedOptions = ref([])
// const region=ref("")
// const handleChange = () => {
//   if (
//       selectedOptions.value[0] != null &&
//       selectedOptions.value[1] != null &&
//       selectedOptions.value[2] != null
//   ) {
//     region.value =
//         codeToText[selectedOptions.value[0]] + ' ' +
//         codeToText[selectedOptions.value[1]] + ' ' +
//         codeToText[selectedOptions.value[2]]
//   }
// }

const doRegister=()=>{
  const {account,phone,password,nickName,email}=form.value
  formRef.value.validate(async (valid)=>{
    // valid:所有表单都通过校验才true
    if(valid){
      const res=await registerAPI({account,phone,password,nickName,email})
      result.value=res.message
      if (result.value==='操作成功'){
        ElMessage({ type: 'success', message: '注册成功' })
        await router.replace({path: '/login'})
      }
    }
  })
}

</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/"></RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户注册</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <!--            绑定表单、规则对象-->
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100px"
                     status-icon>
              <!--              双向绑定-->
              <el-form-item prop="account"  label="用户名">
                <el-input v-model="form.account"/>
              </el-form-item>
              <el-form-item prop="phone"  label="手机号">
                <el-input v-model="form.phone"/>
              </el-form-item>
              <el-form-item prop="email"  label="邮箱">
                <el-input v-model="form.email"/>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" show-password/>
              </el-form-item>
<!--              <el-form-item prop="nickName"  label="昵称">-->
<!--                <el-input v-model="form.nickName"/>-->
<!--              </el-form-item>-->
<!--              <el-divider></el-divider>-->
<!--              <el-form-item prop="receiver"  label="收货人姓名">-->
<!--                <el-input v-model="form.receiver"/>-->
<!--              </el-form-item>-->
<!--              <el-form-item prop="contact"  label="收货人手机">-->
<!--                <el-input v-model="form.contact"/>-->
<!--              </el-form-item>-->

<!--              <el-form-item prop="address"  label="收货地址">-->
<!--                <el-cascader-->
<!--                    size="default" style="padding-bottom: 6px;" placeholder="请选择地区"-->
<!--                    :options="options"-->
<!--                    v-model="selectedOptions"-->
<!--                    @change="handleChange"/>-->
<!--                <el-input placeholder="请输入详细地址" v-model="form.address"/>-->
<!--              </el-form-item>-->

              <el-form-item prop="agree" label-width="22px">
                <el-checkbox v-model="form.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
                <el-button size="large" class="subBtn" @click="doRegister">注册</el-button>

            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <!--          <a href="javascript:;">售后服务</a>-->
          <!--          <a href="javascript:;">配送与验收</a>-->
          <!--          <a href="javascript:;">商务合作</a>-->
          <!--          <a href="javascript:;">搜索推荐</a>-->
          <!--          <a href="javascript:;">友情链接</a>-->
        </p>
        <p>CopyRight &copy; Rean</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: #fff;
  height: 680px;
  position: relative;

  .wrapper {
    width: 480px;
    background: #fff;
    position: absolute;
    left: 25%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 80px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 30px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
