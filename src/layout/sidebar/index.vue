<template>
  <el-aside width="150px" class="fixed top-[60px]">
    <el-menu 
      class="shadow bg-white/75 dark:bg-black/75 backdrop-blur-sm"
      :class="sidebarStore.collapse"
      :collapse="sidebarStore.collapse"
      router
    >
      <SidebarItem :item="item" v-for="item in items" :key="item.name"/>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSidebarStore } from '../../store/sidebarStore';
import SidebarItem from './SidebarItem.vue';

const router = useRouter()
const items = router.options.routes
  .find((val) => val.name === 'Home')
  ?.children?.filter((val) => !val.hidden)


const sidebarStore = useSidebarStore()
</script>

<style scoped lang="scss">
.el-aside {
  > .el-menu {
    position: fixed;
    width: 150px;
    border-right: 0 none;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
  > .el-menu--collapse {
    width: 64px;
  }
}
</style>