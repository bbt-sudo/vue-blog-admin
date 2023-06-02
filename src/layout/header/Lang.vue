<template>
  <el-dropdown @command="handelCommand">
    <span class="el-dropdown-link" >
      {{ currentLan }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="lang in langs" :command="lang">{{ lang.title }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">import { useLocaleStore } from '~/store/localeStore';
import { langs } from '~/locale';
import { ref } from 'vue';

const useLocale = useLocaleStore()
let curLocale = useLocale.locale
let currentLan = ref(langs.find((cur: { key: any; }) => cur.key === curLocale)?.title  || '' )
function handelCommand(command: any) {
  
  currentLan.value = command.title
  useLocale.setLocale(command.key)
}


</script>