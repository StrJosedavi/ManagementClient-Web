<template>
  <div v-if="message" :class="['message', messageType]">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const messageType = ref('')

setTimeout(() => {
  message.value = ''
}, 3000)
</script>

<script>
export default {
  name: 'PopMessage'
}
</script>

<style scoped>
.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
