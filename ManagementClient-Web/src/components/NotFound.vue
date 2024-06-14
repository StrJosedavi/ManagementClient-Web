<!-- src/components/NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Essa pagina não existe, tente recarregar</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  width: auto;
}
h1 {
  color: #000;
}
p {
  color: #000;
}
</style>
