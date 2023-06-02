<template>
  <div class="v-header backdrop-blur-sm bg-gradient-to-r from-green-200 to-blue-300 ">
    <div class="logo underline decoration-sky-500 decoration-wavy decoration-2 font-bold">vue-blog-admin</div>
    <div class="inline-flex items-center h-full text-xl" @click="collapseChage">
      <i-ep-expand icon-name="ep-expand" class="text-sm w-10 h-6" v-if="sidebarStore.collapse" />
      <i-ep-fold icon-name="ep-fold" class="text-sm w-10 h-6" v-else />
    </div>

    <div class="flex items-center pr-4 ml-auto">
      <SiteSerch/>

       <el-switch
        v-model="darkMode"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        class="mx-2"
        @change="toggleDark()"
        style="--el-switch-on-color: #0960bd; --el-switch-off-color: #ff6600"
      />
        <el-select v-model="tenantId" class="mr-4" placeholder="Select">
          <el-option
            v-for="item in tenantOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div class="flex items-center">
          <Lang/>
          <Message/>

          <el-avatar class="ml-2" :size="30" :src="userStore.userInfo?.avatar" />
          <el-dropdown class="mx-2 mr-2" trigger="click" @command="handleCommand">
            <span class="flex items-center cursor-pointer">
              <span>{{ userStore.userInfo.nickname || '未登录' }}</span>
              <el-icon class="el-icon--right">
                <MoIcon icon-name="ep-arrow-down" />
              </el-icon>
            </span>
            <template #dropdown>
              
              <el-dropdown-menu v-if="userStore.userInfo?.nickname !== undefined">
                <a href="https://github.com/lucidity99/mocha-vue3-system" target="_blank">
                  <el-dropdown-item>项目仓库</el-dropdown-item>
                </a>
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu v-else>
                <el-dropdown-item divided command="login" @click="login">登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useSidebarStore } from '../../store/sidebarStore';
import SiteSerch from './SiteSerch.vue';
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core';
import { SelectOptionItem } from '../../types/Serch';
import Lang from './Lang.vue';
import Message from './Message.vue';
import im from '../../assets/imag/avatar.jpeg'
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';

/**
* 仓库
*/
const sidebarStore = useSidebarStore()
const userStore = useUserStore()
/**
* 路由对象
*/
/**
* 路由实例
*/
const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const darkMode = ref(false)
const isDark = useDark()
darkMode.value = isDark.value
const toggleDark = useToggle(isDark)
const tenantId = ref('mocha')
const tenantOptions: Array<SelectOptionItem> = reactive([{ value: 'mocha', label: 'mocha' }])

console.log(userStore.userInfo?.nickname);


  const collapseChage = () => {
  sidebarStore.handelCollapse()
}

const handleCommand = () => {

}

const login = async () => {
  router.push('/login')
}

const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='scss'>
.v-header{
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
}
</style>