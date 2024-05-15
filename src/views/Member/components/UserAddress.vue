<script setup>
import AddressFormDialog from "@/components/dialog/AddressFormDialog.vue";
import {MODE} from "@/composables/dialogTypes.js";
import {ref,onMounted} from "vue";
import {getAddressAPI} from "@/apis/user.js";

const formDialogRef = ref(AddressFormDialog)
const blockForm={
  receiver:'',
  contact:'',
  region:'',
  address:'',
  isDefault:false,
  id:-1
}
const openDialog=(mode, item)=>{
  if (!formDialogRef.value) return
  if(item!==null){
    formDialogRef.value.openDialog(mode,item)
  }
  else{
    formDialogRef.value.openDialog(mode,blockForm)
  }
}

const addressList=ref([])
const getUserAddress=async ()=>{
  const res=await getAddressAPI()
  addressList.value=res.result
}

onMounted(()=>getUserAddress())

// 切换地址回调
const activeAddress=ref({})
const switchAddress=(item)=>{
  activeAddress.value=item
}

</script>

<template>
  <div class="home-panel">
    <div class="header">
      <h4>地址管理</h4>
    </div>
    <div class="add-btn">
      <el-button @click="openDialog(MODE.ADD,null)">添加地址</el-button>
    </div>
    <div class="addressWrapper">
      <div class="text item" :class="{active:activeAddress.id===item.id}" @click="switchAddress(item)" v-for="item in addressList"  :key="item.id">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.region + ' '+ item.address }}</li>
        </ul>
        <div style="margin:auto;">
          <el-button size="large" @click="openDialog(MODE.EDIT,item)">修改</el-button>
        </div>
      </div>
    </div>

  </div>
  <AddressFormDialog ref="formDialogRef" @update="getUserAddress"/>
</template>

<style scoped lang="scss">
.home-panel {
  background-color: #fff;
  padding: 0 30px;
  margin-top: 10px;
  min-height: 500px;

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

  .add-btn{
    padding-top: 20px;
    text-align: right;
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
  padding-top: 20px;
  padding-bottom: 30px;
  margin: auto;
  width: 75%;
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
      padding: 10px 30px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

.defaultAddress{
  cursor: pointer;
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
