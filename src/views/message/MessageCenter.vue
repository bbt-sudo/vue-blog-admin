<template>
  <div class="flex h-full">
    <div class="bg-gray-100 shadow-inner w-52 dark:bg-black/50">
      <ul>
        <li
          v-for="(item, index) in messageTypeList"
          :key="item.title"
          class="flex items-center p-4 cursor-pointer hover:text-blue-500"
          :class="currentIndex === index ? 'bg-white dark:bg-gray-200/10' : ''"
          @click="changeType(index)"
        >
          <span>{{ item.title }}</span>
          <span
            v-if="item.total > 0"
            class="px-2 ml-auto text-xs text-white bg-red-600 rounded-full"
            >{{ item.total }}</span
          >
        </li>
       
      </ul>
    </div>
    <div class="flex-1">
      <component @messageNum="messageNum" :is="messageTypeList[currentIndex].component"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageList from './MessageList.vue'
import NoticeList from './NoticeList.vue'
import { ref, shallowRef, onMounted, defineEmits } from 'vue'


const total = ref(0)
const messageTotal = ref(0)
const emit = defineEmits()

function messageNum (value: number) {
  total.value = value
  
}


let messageTypeList = ref([
  { title: '消息通知', total, component: shallowRef(MessageList) },
  { title: '公告', total, component: shallowRef(NoticeList) },
  { title: '今日需跟进客户', total, component: shallowRef(NoticeList) },
  { title: '待审核合同', total, component: shallowRef(NoticeList) },
  { title: '待回款', total, component: shallowRef(NoticeList) },
  { title: '待发货出库单', total, component: shallowRef(NoticeList) }
])


let currentIndex = ref(0)

function changeType(index: number) {
  currentIndex.value = index
}
onMounted(() => {

})
</script>