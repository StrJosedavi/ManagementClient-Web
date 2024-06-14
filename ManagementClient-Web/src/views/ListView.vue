<template>
  <div class="list-container">
    <h1>Pessoas</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" v-model="cpf" placeholder="Informe o CPF">
      </div>
      <div class="filter-group">
        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" v-model="cnpj" placeholder="Informe o CNPJ">
      </div>
      <button @click="fetchPersons">Filtrar</button>
    </div>

    <div class="person-list">
      <ul class="person-items">
        <li v-for="person in persons" :key="person.id" class="person-item">
          <div class="person-details">
            <p><strong>Nome:</strong> {{ person.fullName }}</p>
            <p><strong>CPF:</strong> {{ person.cpf }}</p>
            <p v-if="person.type === 1"><strong>Empresa:</strong> {{ person.companyName }}</p>
            <p v-if="person.type === 1"><strong>CNPJ:</strong> {{ person.cnpj }}</p>
            <p v-if="person.type === 0"><strong>Tipo:</strong> Pessoa Física</p>
            <p v-else><strong>Tipo:</strong> Pessoa Jurídica</p>
            <p><strong>Email:</strong> {{ person.mail }}</p>
            <p><strong>Telefone:</strong> {{ person.phone }}</p>
            <p><strong>Endereço:</strong> {{ person.address }}</p>
            <p><strong>Data de Nascimento:</strong> {{ new Date(person.birthDate).toLocaleDateString() }}</p>
          </div>
        </li>
      </ul>
      <p v-if="persons.length === 0" class="no-results">Não foram encontradas pessoas com os filtros informados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const cpf = ref('');
const cnpj = ref('');
const persons = ref([]);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const fetchPersons = async () => {
  try {
    const response = await axios.get('https://localhost:5200/Person/GetAll', {
      params: {
        cpf: cpf.value,
        cnpj: cnpj.value
      }
    });

    console.log('Response data:', response.data); // Verifica o que está sendo retornado pela API

  } catch (error) {
    console.error('Error fetching persons:', error);
    alert('Falha ao buscar pessoas. Por favor, tente novamente mais tarde.');
  }
};

</script>

<style scoped>
li {
  color: #000;
}

h1 {
  color: #000;
}

.list-container {
  padding: 20px;
  background-color: #f0f0f0;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.filter-group {
  margin-right: 10px;
}

label {
  margin-right: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.person-list {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 5px;
}

.person-items {
  list-style: none;
  padding: 0;
}

.person-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.person-details {
  line-height: 1.5;
}

.no-results {
  font-style: italic;
  color: #888;
}
</style>
