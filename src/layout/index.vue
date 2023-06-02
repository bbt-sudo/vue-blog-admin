<template>

  <v-header :class="{ 'header-collapse': sidebar.collapse }" />
  <v-tags :class="{ 'tag-collapse': sidebar.collapse }"></v-tags>
  <vSideBar class="siderbar" ref="ctx"/>
  <div 
    class="main-content" 
    :class="{ 'content-collapse': sidebar.collapse},sidebar.collapse? 'main-mx' :'main-min'"
  >
    <router-view v-slot="{ Component }">
      
    </router-view>
  </div>
</template>

<script setup lang='ts'>
import vHeader from './header/index.vue'
import vSideBar from './sidebar/index.vue'
import vTags from './tags/index.vue'
import { useSidebarStore } from '../store/sidebarStore'
import { useTagsStore } from '../store/tagsStore'
import { onMounted, ref, toRef, watch } from 'vue'
const sidebar = useSidebarStore()
const tags = useTagsStore()
const collapse = toRef(sidebar.collapse)
watch(collapse, (newValue, oldValue) => {
})

onMounted(() => {
})
</script>
<style scoped lang='scss'>
.main-content{
  margin-top: 90px;

}
.main-min{
  width: 89.8%;
  margin-left: 155px;
}
.main-mx{
  width: 95.5%;
  margin-left: 68px;

}
</style>