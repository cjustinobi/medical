<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input id="email" v-model="email" type="email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="password" type="password" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const { setToken } = useAuth()

const router = useRouter()

const email = ref('tester@kompletecare.com')
const password = ref('password')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const { login } = await GqlLoginUser({
      email: email.value,
      password: password.value
    })

    if (!login) {
      error.value = 'Invalid credentials'
      return
    }

    console.log('login ', login)
    setToken(login)
    router.push('/')
    
  } catch (err) {
    console.log('err', err)
  } finally {
    router.push('/')
    loading.value = false
  }
}
</script>