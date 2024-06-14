<template>
  <header>
    <img alt="icon-web" class="logo" src="./assets/web-icon.svg" width="125" height="125" />
  </header>

  <router-view />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
#app {
  background-color: #f0f0f0;
}

header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 50px;
  width: auto;
}

nav {
  display: flex;
}

nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #333;
  transition: color 0.2s ease;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #007bff;
}
</style>
