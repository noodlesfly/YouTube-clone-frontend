<!-- src\views\signin\index.vue -->
<template>
  <div class="gspRov">
    <h2>Login to your account</h2>
    <form @submit.prevent="handleSubmit">
      <ul class="errors" v-if="errors.length">
        <li v-for="(item,index) in errors" :key="index">{{item}}</li>
      </ul>
      <input type="email" v-model="user.email" placeholder="email" />
      <input type="password" v-model="user.password" placeholder="password" />
      <div class="action input-group">
        <span class="pointer">Signup instead</span>
        <button :disabled="isLoading">Login</button>
      </div>
    </form>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { ReqLogin } from '@/service/types/user'
import { login } from '@/service/user'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index'

const router = useRouter()
const store = useStore()

const user = reactive<ReqLogin>({
  email: '',
  password: ''
})
const errors = ref<string[]>([])
const isLoading = ref<boolean>(false)

const handleSubmit = async () => {
  try {
    errors.value = []
    isLoading.value = true
    const { user: resUser } = await login(user)
    store.commit('setUser', resUser)
    let redirect = router.currentRoute.value.query.redirect ? router.currentRoute.value.query.redirect : '/'
    if (typeof redirect !== 'string') {
      redirect = '/'
    }
    router.replace({
      path: redirect
    })
  } catch (error:any) {
    error.detail = error.detail ? error.detail.map((item:any) => item.message) : null
    errors.value = error.detail ? error.detail : [error.error]
  } finally {
    isLoading.value = false
  }
}

</script>
