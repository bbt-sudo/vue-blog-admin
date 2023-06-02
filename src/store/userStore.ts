import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { login, editPassword } from '~/api/user'
import md5 from 'md5'
import Cookies from 'js-cookie'
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      userInfo: reactive({}),
      userPermiss: ref([]),
    }
  },
  getters: {},
  actions: {
    async userLogin(data: { username: string; password: string }) {
      const res = await login({
        username: data.username,
        password: data.password,
      })
      if (res.code === 200) {
        this.userInfo = res.data.userInfo
        this.userInfo.id = md5(res.data.userInfo.id)
        this.userInfo.username = md5(res.data.userInfo.username)
        this.userPermiss = res.userInfo
        let seconds = 7200
        let expires = new Date(new Date() * 1 + seconds * 1000)
        Cookies.set('token', res.data.token, { expires: expires })
        return true
      }
      return false
    },

    // 退出登录
    async userLogout() {
      this.userInfo = ''
      this.userPermiss = []
    },

    async userEditPassword(id: number, password: string) {
      const res = await editPassword({
        id: id,
        password: password,
      })

      console.log(res)
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userInfo'] }],
  },
})
