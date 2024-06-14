<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await axios.post('https://localhost:5200/Authentication', {
      username: username.value,
      password: password.value
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      alert('Login successful!');
      // Redireciona para outra rota após login bem-sucedido
      router.push('/list');
    } else {
      alert('Login failed. Invalid credentials.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login failed. Please try again later.');
  }
};
</script>

<style scoped>
/* Estilos específicos para esta view */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-form {
  width: 100%;
  max-width: 400px;
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
  font-weight: bold;
  color: #000;
}

input {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 3px;
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

@media (max-width: 768px) {
  .login-form {
    padding: 10px;
  }

  input {
    width: 100%;
  }
}
</style>
