<template>
  <div>
    <header>
      <img alt="icon-web" class="logo" src="./assets/web-icon.svg" width="125" height="125" />
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
header {
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 50px;
  width: auto;
}
</style>
