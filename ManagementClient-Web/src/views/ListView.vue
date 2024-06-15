<template>
  <div class="list-container">
    <h1>Pessoas</h1>

    <div class="filters">
      <div class="filter-group">
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" v-model="cpf" placeholder="Informe o CPF" />
      </div>
      <div class="filter-group">
        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" v-model="cnpj" placeholder="Informe o CNPJ" />
      </div>
      <div class="button-group">
        <button @click="fetchPersons">Filtrar</button>
        <button @click="navigateToCreatePerson" class="btn-createPerson">Novo</button>
      </div>
    </div>

    <div class="person-list">
      <ul v-if="persons.length > 0" class="person-items">
        <li v-for="person in persons" :key="person.id" class="person-item">
          <div v-if="person.type === 0" class="person-details-cpf">
            <p><strong>Nome Completo:</strong> {{ person.fullName }}</p>
            <p><strong>CPF:</strong> {{ person.cpf }}</p>
            <p><strong>Email:</strong> {{ person.mail }}</p>
            <p><strong>Telefone:</strong> {{ person.phone }}</p>
            <p><strong>Endereço:</strong> {{ person.address }}</p>
            <p><strong>Data de Nascimento:</strong> {{ new Date(person.birthDate).toLocaleDateString() }}</p>
          </div>
          <div v-else-if="person.type === 1" class="person-details-cnpj">
            <p><strong>Razão Social:</strong> {{ person.companyName }}</p>
            <p><strong>Nome Fantasia:</strong> {{ person.tradingName }}</p>
            <p><strong>CNPJ:</strong> {{ person.cnpj }}</p>
            <p><strong>Email:</strong> {{ person.mail }}</p>
            <p><strong>Telefone:</strong> {{ person.phone }}</p>
            <p><strong>Endereço:</strong> {{ person.address }}</p>
          </div>
          <DeletePerson :personId="person.id" @deleted="removePersonFromList" />
          <button @click="navigateToUpdatePerson(person.id)">Atualizar</button>
        </li>
      </ul>
      <p v-else class="no-results">
        Não foram encontradas pessoas com os filtros informados.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import DeletePerson from '../components/DeletePerson.vue'

const cpf = ref('')
const cnpj = ref('')
const persons = ref([])

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

const navigateToUpdatePerson = (personId) => {
  router.push({ path: '/updatePerson', query: { id: personId } })
}

const removePersonFromList = (deletedPersonId) => {
  persons.value = persons.value.filter(person => person.id !== deletedPersonId)
}

const navigateToCreatePerson = () => {
  router.push('/createPerson')
}

const fetchPersons = async () => {
  try {
    if ((cpf.value && cnpj.value) || (!cpf.value && !cnpj.value)) {
      throw 'Digite apenas um filtro CPF ou CNPJ'
    }

    let params = {}
    if (cpf.value) {
      params = { cpf: cpf.value }
    } else if (cnpj.value) {
      params = { cnpj: cnpj.value }
    }

    const response = await axios.get('https://localhost:5200/Person/GetAll', {
      params: params
    })

    console.log('Response data:', response.data)

    // Mapear os dados recebidos para o formato esperado na lista
    persons.value = response.data.person.map(person => ({
      id: person.id,
      type: person.type,
      address: person.address,
      mail: person.mail,
      phone: person.phone,
      fullName: person.type === 0 ? person.fullName : null,
      cpf: person.type === 0 ? person.cpf : null,
      birthDate: person.type === 0 ? person.birthDate : null,
      companyName: person.type === 1 ? person.companyName : null,
      cnpj: person.type === 1 ? person.cnpj : null,
      tradingName: person.type === 1 ? person.tradingName : null
    }))

  } catch (error) {
    alert(error)
  }
}
</script>

<style scoped>
.btn-createPerson {
  margin-left: auto;
}

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

.button-group {
  padding: 8px;
  margin-top: 18px;
  display: flex;
  width: 100%;
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

.person-details-cpf, .person-details-cnpj {
  line-height: 1.5;
}

.no-results {
  font-style: italic;
  color: #888;
}
</style>
