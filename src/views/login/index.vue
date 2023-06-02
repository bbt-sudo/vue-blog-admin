<template>
  <div class="login-box">

    <div class="login shadow backdrop-blur-sm bg-white/75 dark:bg-black/75">
      <div class=""></div>
      <img class="login-l shadow backdrop-blur-sm bg-white/75 dark:bg-black/75" src="../../assets/imag/f11b7350eb834f01819fc809af15bc1e.jpeg" alt="">
      <div class="login-r">
        <span class="logo">登陆</span>
        <el-input v-model="data.username" placeholder="请输入用户名" clearable />
        <el-input v-model="data.password" type="password"  show-password placeholder="请输入密码" clearable />
        <el-button type="primary" :icon="User" @click="setGo">登陆</el-button>
      </div>
    </div>
     <ul class="bg-squares">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>

  </div>
 
</template>


<script setup lang="ts">
import { reactive } from 'vue';
import {
User
} from '@element-plus/icons-vue'

import { useUserStore } from '../../store/userStore'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'


const data = reactive({
  username: '',
  password: ''
})
const userStore = useUserStore()
const router = useRouter()


const setGo = () => {
  userStore.userLogin(data).then((res) => {
    if(res) {
      ElMessage({
        type: 'primary',
        message: "登陆成功"
      })
      router.push('/')
    }    
  }) 
}
</script>

<style scoped lang="scss">
.login-box{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login{
    width: 50vw;
    height: 50vh;
    z-index: 10;
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
    display: flex;
    border-radius: 10px;
    .login-l{
      width: 40%;
      display: block;
    }
    .login-r{
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
.logo{
  position: absolute;
  z-index: 10;
  top: 10px;
}
.el-input {
  width: 80%;
  margin-bottom: 10px;
}


/* 背景方块*/
.bg-squares{
    list-style: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: aquamarine;
}
.bg-squares li{
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    position: absolute;
    bottom: 0px;
    /* 执行动画：动画名 时长 线性 无限次播放*/
    animation: squres 2s linear infinite ;
}
/* 为每一个方块设置不同的位置、大小、动画延迟时间、动画时长、背景色  */
.bg-squares li:nth-child(1){
    left: 10%;
    background-color: rgb(159, 247, 247);

}
.bg-squares li:nth-child(2){
    left: 20%;
    width: 80px;
    height: 80px;
    /* 动画延迟时间 */
    animation-delay:2s;
    /* 动画时长 */
    animation-duration: 17s;
    background-color: rgb(200, 239, 136);

}
.bg-squares li:nth-child(3){
    left: 25%;
    animation-delay: 4s;
    background-color: rgb(138, 245, 156);

}
.bg-squares li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    background-color:rgba(255, 255, 255, 0.25) ;
    animation-duration: 22s;
    background-color: rgb(148, 180, 240);

}
.bg-squares li:nth-child(5){
    left: 70%;
    background-color: rgb(130, 152, 152);

}
.bg-squares li:nth-child(6){
    left: 80%;
    width: 120px;
    height:120px;
    background-color:rgba(255, 255, 255, 0.2) ;
    animation-delay: 3s;
    background-color: rgb(249, 198, 242);

}
.bg-squares li:nth-child(7){
    left: 32%;
    width: 30px;
    height: 160px;
    animation-delay: 7s;
}
.bg-squares li:nth-child(8){
    left: 55%;
    width: 20px;
    height: 20px;
    animation-delay: 15s;
    animation-duration: 40s;
}
.bg-squares li:nth-child(9){
    left: 25%;
    width: 10px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    animation-delay: 2s;
    animation-duration: 40s;
}
.bg-squares li:nth-child(10){
    left: 90%;
    width: 30px;
    height: 30px;
    animation-delay: 11s;
}
.container.success h1{
    transform: translateY(75px);
    background-color: rgb(159, 247, 247);

}
.container.success .form{
     opacity: 0;
}
/*定义动画*/
@keyframes squres{
    0%{
        transform: translateY(0);
    }
    100%{
        transform: translateY(-100vh) rotate(600deg);
    }
}



</style>