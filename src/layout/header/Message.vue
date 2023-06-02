<template>
  <div class="w-8 cursor-pointer ml-2" @click="visible = true">
      <i-ep-ChatRound icon-name="ep-ChatRound" class="text-sm w-10 h-6" v-if="messageTotalNum === 0"/>

     <el-badge :value="messageTotalNum" class="item" :hidden="!messageTotalNum" v-else>
      <i-ep-ChatLineRound icon-name="ep-ChatLineRound" class="text-sm w-7 h-6" />
    </el-badge>
  </div>
   <el-drawer class="no-header" v-model="visible" size="80%" append-to-body>
    <span class="title text-center">通知中心</span>

    <MessageCenter/>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MessageCenter from '../../views/message/MessageCenter.vue'
import { getMessageList }from '~/api/system'

const visible = ref(false)

const messageTotalNum = ref()
messageTotalNum.value = getMessageList().list.length*6


onMounted(() =>{

  
})
</script>

<style scoped lang="scss">
.el-drawer.no-header {
  overflow: visible;
  .el-drawer__header {
    height: 0;
    padding: 0;
    margin: 0;
  }
  .el-drawer__close-btn {
    background-color: var(--el-color-primary);
    position: absolute;
    left: -36px;
    top: 30%;
    border-radius: 4px 0 0 4px;
    color: #fff;
    padding: 8px;
  }
  .el-drawer__body {
    padding: 0;
  }
}
.title{
  position: absolute;
  left: 50%;
  top: 20px;
 
}
</style>