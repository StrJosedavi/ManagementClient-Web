<!-- src/App.vue -->


<template>
  <div id="app">
    <header>
      <img alt="Vue logo" class="logo" src="./assets/web-icon.svg" width="125" height="125" />
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
/* Estilos para o container principal */
#app {
  background-color: #f0f0f0;
}

/* Estilos para o cabeçalho */
header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff; /* Fundo branco */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
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
  transition: color 0.2s ease; /* Transição suave de cor */
}

/* Estilizando o link ativo */
nav a.router-link-exact-active {
  font-weight: bold;
  color: #007bff; /* Azul primário */
}
</style>
