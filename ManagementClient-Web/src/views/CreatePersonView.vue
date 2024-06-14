<template>
  <div>
    <h1>Criação de Pessoa</h1>
  </div>
  <form @submit.prevent="CreatePerson" class="login-form">
    <div class="form-group">
      <label for="typePerson">Tipo de Pessoa </label>
      <select>
        <option>PJ</option>
        <option>PF</option>
      </select>
    </div>
    <div class="form-group">
      <label for="address">Endereço:</label>
      <input type="text" id="address" v-model="username" required />
    </div>
    <div class="form-group">
      <label for="phone">Telefone:</label>
      <input type="text" id="phone" v-model="phone" required />
    </div>
    <div class="form-group">
      <label for="mail">Email:</label>
      <input type="text" id="mail" v-model="password" required />
    </div>
    <button type="submit">Criar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const personType = ref('')

const CreatePerson = async () => {
  try {
    let response
    if (personType.value == 'PF') {
      response = await axios.get('https://localhost:5200/Create', {
        body: {}
      })
    }
    if (personType.value == 'PJ') {
      response = await axios.get('https://localhost:5200/Create', {
        body: {}
      })
    }
    if (personType.value != 'PJ' && personType.value != 'PJ') {
      throw 'Tipo de pessoa Inválido'
    }

    if (response.status === 200) {
      console.log('Response data:', response.data)
      alert('deu bom')
    } else {
      alert('deu ruim')
    }
  } catch (error) {
    alert(error)
  }
}
</script>

<script>
export default {
  name: 'CreatePersonView'
}
</script>

<style scoped>
button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
