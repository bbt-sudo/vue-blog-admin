<template>
  <!-- <el-table :data="data.tableData" style="width: 100%" table-layout="fixed">
    <el-table-column fixed prop="date" label="创建时间" width="150" />
    <el-table-column prop="name" label="用户名称" width="120" />
    <el-table-column prop="state" label="登陆用户名" width="120" />
    <el-table-column prop="role" label="Role" width="120" />
   
   <el-table-column align="right">
      <template #header>
        <el-input v-model="data.search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click=" handelPassword(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handelDel(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table> -->

   <el-table-v2
    :columns="columns"
    :data="data.tableData"
    :height="400"
    style="width: 100%;"
  />
      

    <el-dialog v-model="data.dialogEditPasswordVisible" title="修改密码">
      <el-input v-model="data.password" type="password"  show-password placeholder="请输入密码" clearable />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rejectEdit">取消</el-button>
          <el-button type="primary" @click="assignEdit">
            确定
          </el-button>
        </span>
      </template>
  </el-dialog>

  <el-dialog v-model="data.dialogEditUserInfoVisible" title="修改用户信息">
      <el-upload
        class="avatar-uploader"
        :action="data.uploadData.uploadUrl"
        :show-file-list="true"
        :before-upload="beforeAvatarUpload"
        :on-success="changeUpload"
        :data="data.uploadData.uploadData"
      >
        <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-input v-model="data.UserInfo.nickname" type="text" placeholder="请输入用户昵称" clearable />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rejectEditUserInfo">取消</el-button>
          <el-button type="primary" @click="assignEditUserInfo">
            确定
          </el-button>
        </span>
      </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref,reactive, h } from 'vue';
import {
  ElButton,
  ElIcon,
  ElTag,
  ElTooltip,
  TableV2FixedDir,
  ElAvatar,
  ElMessage,
} from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import type { Column } from 'element-plus'
import {Delete,Edit ,Plus} from '@element-plus/icons-vue'

import { updateUserInfo, uploadAvatar, userList } from '../../../api/user';
import {useUserStore} from '../../../store/userStore' 
import { uploadToken } from '../../../api/common';



const data = reactive({
  tableData: [
   
  ],
  search: '',
  password: '',
  dialogEditPasswordVisible: false,
  editUserId: 0,
  dialogEditUserInfoVisible: false,
  UserInfo: {
    nickname: '',
    avatar: ''
  },
  imageUrl: '',
  uploadData: {
    uploadUrl: 'https://up-z1.qiniup.com',
    uploadData: {key:'',token:''},
  },
})

const columns = [
  {
    key: "createTime",
    dataKey: "createTime",//需要渲染当前列的数据字段，如{id:9527,name:'Mike'}，则填id
    title: "createTime",//显示在单元格表头的文本
    width: 200,//当前列的宽度，必须设置
    fixed: true,//是否固定列
    cellRenderer: (cellData) => 
      h(
        ElTooltip,
        {
          content: dayjs(cellData.cellData).format('YYYY/MM/DD')
        },
        () =>  h(
            'span',
            {
              class: 'flex items-center',
              
            },
            h(
              ElIcon,
                {
                  class: 'mr-3'
                },
                () =>  h(
                  Timer
                )
            ),
              
            `${cellData.cellData}`
          )
         
      
      ),
      
  },
  {
    key: "nickname",
    dataKey: "nickname",//需要渲染当前列的数据字段，如{id:9527,name:'Mike'}，则填id
    title: "昵称",//显示在单元格表头的文本
    width: 200,//当前列的宽度，必须设置
    fixed: true,//是否固定列
  },
  {
    key: "username",
    dataKey: "username",//需要渲染当前列的数据字段，如{id:9527,name:'Mike'}，则填id
    title: "用户名",//显示在单元格表头的文本
    width: 160,//当前列的宽度，必须设置
    fixed: true,//是否固定列
  },
  {
    key: "avatar",
    dataKey: "avatar",//需要渲染当前列的数据字段，如{id:9527,name:'Mike'}，则填id
    title: "头像",//显示在单元格表头的文本
    width: 150,//当前列的宽度，必须设置
    fixed: true,//是否固定列
    cellRenderer: (data) => h(
      ElAvatar,
      {src: data.cellData,}
    )
  },
   {
    key: "roleId",
    dataKey: "roleId",//需要渲染当前列的数据字段，如{id:9527,name:'Mike'}，则填id
    title: "角色",//显示在单元格表头的文本
    width: 150,//当前列的宽度，必须设置
    fixed: true,//是否固定列
  },
  {
      key: "handel",
      title: "删除",//显示在单元格表头的文本
      width: 160,//当前列的宽度，必须设置
      fixed: true,//是否固定列
      align: "center",
      cellRenderer: (data) => 
      h(
        ElButton,
        {onClick: () => handelDel,type: "danger", icon: Delete},
        { default: () => "删除" }
      )
    },
    {
      key: "handel",
      title: "修改密码",//显示在单元格表头的文本
      width: 160,//当前列的宽度，必须设置
      fixed: true,//是否固定列
      align: "center",
      cellRenderer: (da) => 
      h(
        ElButton,
        {onClick: () => {
          data.dialogEditPasswordVisible = true
          
          handelUserId(da)
        },type: "warning", icon: Edit},
        { default: () => "修改密码" }
      )
    },
    {
      key: "handel",
      title: "修改用户信息",//显示在单元格表头的文本
      width: 160,//当前列的宽度，必须设置
      fixed: true,//是否固定列
      align: "center",
      cellRenderer: (da) => 
      h(
        ElButton,
        {onClick: () => {
          data.dialogEditUserInfoVisible = true
          
          handelUserId(da)
        },type: "warning", icon: Edit},
        { default: () => "修改用户信息" }
      )
    },
]

const userStore = useUserStore()

// userList.then((res) => {
//   console.log(res);
  
// })



userList().then((res) => {
  data.tableData = res.data
  
})

 const handelUserId= (e) => {
  data.UserInfo.nickname = e.rowData.nickname
  data.UserInfo.avatar = e.rowData.avatar  
  uploadToken().then((res) => {
    console.log(res);
    data.uploadData.uploadData.token = res.data
  })
  data.editUserId = e.rowData.id
 }
const rejectEdit= () => {
  data.dialogEditPasswordVisible = false
}
const assignEdit = (e) => {
  userStore.userEditPassword(data.editUserId,data.password)
  data.dialogEditPasswordVisible = false
}

 const handelDel = (_scopei: any,_scopex: any) => {}


 const beforeAvatarUpload = (file,id) => {
        // var observable = qiniu.upload(file, key, token, putExtra, config)
        const isPNG = file.type === "image/png";
        const isJPEG = file.type === "image/jpeg";
        const isJPG = file.type === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 2;
 
        if (!isPNG && !isJPEG && !isJPG) {
          ElMessage.error("上传头像图片只能是 jpg、png、jpeg 格式!")
          return false;
        }
        if (!isLt2M) {
          ElMessage.error("上传头像图片大小不能超过 2MB!")

          return false;
        }
        data.uploadData.uploadData.key = `avatar/${data.editUserId}/${file.name}`;
        data.UserInfo.avatar = `http://up.textwww.xyz/${data.uploadData.uploadData.key}`

 }
const changeUpload = (res) => {
  console.log(res);
  
}
 const rejectEditUserInfo= () => {
  data.dialogEditUserInfoVisible = false
}
const assignEditUserInfo = (e) => {
  let id = data.editUserId
  
  updateUserInfo({...data.UserInfo,id }).then((res) => {
    
  })
  data.dialogEditUserInfoVisible = false
}

</script>

<style scoped lang="scss">
.el-table-v2 {
  width: 90%;
  margin-top: 10px;
  .el-table-v2__table {
    width: 100%;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}



.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader{
  border: 1px solid black;
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>