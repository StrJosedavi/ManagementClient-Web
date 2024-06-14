<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Entrar</button>
      <PopMessage :message="loginMessage" :messageType="loginMessageType" />
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const loginMessage = ref('')
const loginMessageType = ref('')

const handleSubmit = async () => {
  try {
    const response = await axios.post(
      'https://localhost:5200/Authentication',
      {
        username: username.value,
        password: password.value
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200) {
      const token = response.data.acessToken.code
      localStorage.setItem('token', token)

      loginMessage.value = 'Login successful!'
      loginMessageType.value = 'success'

      router.push('/listPerson')
    } else {
      loginMessage.value = 'Login failed. Invalid credentials.'
      loginMessageType.value = 'error'
    }
  } catch (error) {
    console.error('Error during login:', error)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    }
    loginMessage.value = 'Login failed. Please try again later.'
    loginMessageType.value = 'error'
  }
}
</script>

<style scoped>
.login-container {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin-top: 150px;
}

h2 {
  display: flex;
  justify-content: center;
}

.login-form {
  width: 500px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 20px;
  color: #000;
}

input {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
