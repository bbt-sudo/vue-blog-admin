<template>
  <i-ep-search @click="visible=true" class="text-sm text-gray-600 cursor-pointer"/>

  <el-dialog title="搜索" v-model="visible" append-to-body
    :show-close="false"
    class="bg-gray-100 site-search"
    width="600px"
    @open="onOpen"
    @close="onClose">
    <template #header="{ close, titleId, titleClass }">
      <el-input v-model="keyword" placeholder="搜索全站"   size="large" @input="search" ref="inputRef"></el-input>
    </template>
  
    <div>
      <ul>
        <li
          v-for="(item, index) in list"
          class="flex items-center p-3 mx-4 mb-1 transition-all bg-white rounded shadow cursor-pointer group hover:bg-indigo-400 hover:text-white"
          @click="goto(item.fullPath)"
        >
          <div>
            <div>{{ item?.meta?.title }} {{ item.name }}</div>
            <div class="text-sm text-gray-400 transition-all group-hover:text-white">
              {{ item.fullPath }}
            </div>
          </div>
          <i-ep-position class="ml-auto text-white text-large" />
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script setup lang='ts'>
import { InputInstance } from 'element-plus/es/components/index.js';
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch, nextTick } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { deepClone } from '../../utils';
import { useMagicKeys } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

/**
* 仓库
*/
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
const visible = ref(false)
let keyword = ref()
let list = ref()
let flatRouteList: RouteRecordRaw[] = flatJson(router.options.routes)
let localeRouteList: RouteRecordRaw[] = []
let inputRef = ref<InputInstance>()
const keys = useMagicKeys()
const CtrlK = keys['Ctrl+K']
const CommandK = keys['Cmd+K']
const { t } = useI18n()

watch(CtrlK, (_v) => {
  visible.value = true
})

watch(CommandK, (_v) => {
  visible.value = true
})

function onOpen() {
   nextTick(() => {
    inputRef.value?.focus()
  })
  localeRouteList = deepClone(flatRouteList)
  localeRouteList.forEach((cur) => {
    cur.meta.title = t(cur?.meta?.title)
  })
}
function onClose() {
  visible.value = false
  keyword.value = ''
  list.value = []
}
function search() {
   list.value = localeRouteList.filter(
    (val: RouteRecordRaw) =>
      val?.name?.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1 ||
      val?.meta?.title?.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1
  )
}
function goto(path: string) {
  onClose()
  router.push(path)
}

function flatJson(jsonData: RouteRecordRaw[], fp?: '') {
  return jsonData.reduce((pre, cur) => {
    const { children = [], ...item } = cur
    let fullPath = fp ? fp + '/' + cur.path : cur.path
    fullPath = fullPath.replace(/\/+/g, '/')

    return pre.concat([{ ...item, fullPath }], flatJson(children, fullPath))
  }, [] as RouteRecordRaw[])
}
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
})

</script>
<style scoped lang='scss'>
</style>