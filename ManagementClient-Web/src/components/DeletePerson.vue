<template>
    <button @click="confirmDelete" class="delete-button">
      Deletar
    </button>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    personId: {
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(['deleted']);
  
  const confirmDelete = async () => {
    const confirmation = confirm('Você tem certeza que deseja deletar esta pessoa?');
    if (confirmation) {
      try {
        const response = await axios.delete(`https://localhost:5200/Person/${props.personId}`);
        if (response.status === 200) {
          alert('Pessoa deletada com sucesso!');
          emit('deleted', props.personId);
        } else {
          alert('Falha ao deletar pessoa.');
        }
      } catch (error) {
        console.error('Erro ao deletar pessoa:', error);
        alert('Erro ao deletar pessoa. Por favor, tente novamente mais tarde.');
      }
    }
  };
  </script>
  
  <style scoped>
  .delete-button {
    padding: 8px 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  </style>
  