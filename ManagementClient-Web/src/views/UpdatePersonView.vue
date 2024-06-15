<template>
  <div>
    <h1>Atualização de Pessoa</h1>
    <form @submit.prevent="UpdatePerson" class="login-form">
      <div class="form-group">
        <label for="typePerson">Tipo de Pessoa</label>
        <select v-model="personType" id="typePerson" disabled>
          <option value="PJ">PJ</option>
          <option value="PF">PF</option>
        </select>
      </div>

      <div v-if="personType === 'PF'">
        <div class="form-group">
          <label for="fullName">Nome Completo:</label>
          <input type="text" id="fullName" v-model="fullName" required />
        </div>
        <div class="form-group">
          <label for="cpf" >CPF:</label>
          <input type="text" id="cpf" v-model="cpf" required disabled />
        </div>
        <div class="form-group">
          <label for="birthDate">Data de Nascimento:</label>
          <input type="date" id="birthDate" v-model="birthDate" required />
        </div>
      </div>

      <div v-if="personType === 'PJ'">
        <div class="form-group">
          <label for="companyName">Razão Social:</label>
          <input type="text" id="companyName" v-model="companyName" required />
        </div>
        <div class="form-group">
          <label for="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" v-model="cnpj" required />
        </div>
        <div class="form-group">
          <label for="tradingName">Nome Fantasia:</label>
          <input type="text" id="tradingName" v-model="tradingName" required />
        </div>
      </div>

      <div class="form-group">
        <label for="address">Endereço:</label>
        <input type="text" id="address" v-model="address" required />
      </div>
      <div class="form-group">
        <label for="phone">Telefone:</label>
        <input type="text" id="phone" v-model="phone" required />
      </div>
      <div class="form-group">
        <label for="mail">Email:</label>
        <input type="email" id="mail" v-model="mail" required />
      </div>
      <button type="submit">Atualizar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const personType = ref('');
const fullName = ref('');
const cpf = ref('');
const birthDate = ref('');
const companyName = ref('');
const cnpj = ref('');
const tradingName = ref('');
const address = ref('');
const phone = ref('');
const mail = ref('');
const router = useRouter();
const route = useRoute();
const personId = route.query.id;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchPersonDetails = async () => {
  try {
    const response = await axios.get(`https://localhost:5200/Person/${personId}`);
    const person = response.data.person;

    console.log(person);

    personType.value = person.type === 0 ? 'PF' : 'PJ';
    address.value = person.address;
    phone.value = person.phone;
    mail.value = person.mail;

    console.log(personType.value);
    console.log(address.value);
    console.log(phone.value);
    console.log(mail.value);

    if (person.type === 0) {
      fullName.value = person.naturalPerson.fullName;
      cpf.value = person.naturalPerson.cpf;
      birthDate.value = person.naturalPerson.birthDate.split('T')[0];
    } 
    if (person.type === 1) {
      companyName.value = person.personJuridical.companyName;
      cnpj.value = person.personJuridical.cnpj;
      tradingName.value = person.personJuridical.tradingName;
    }
    
  } catch (error) {
    console.error('Erro ao buscar detalhes da pessoa:', error);
    alert('Erro ao buscar detalhes da pessoa. Por favor, tente novamente mais tarde.');
  }
};

const UpdatePerson = async () => {
  try {
    let response;
    if (personType.value === 'PF') {
      const birthDateISO = new Date(birthDate.value).toISOString();

      response = await axios.put(`https://localhost:5200/Person/${personId}`, {
        type: 0,
        address: address.value,
        phone: phone.value,
        mail: mail.value,
        naturalPerson: {
          fullName: fullName.value,
          cpf: cpf.value,
          birthDate: birthDateISO,
        }
      });
    } else if (personType.value === 'PJ') {
      response = await axios.put(`https://localhost:5200/Person/${personId}`, {
        type: 1,
        address: address.value,
        phone: phone.value,
        mail: mail.value,
        personJuridical: {
          companyName: companyName.value,
          cnpj: cnpj.value,
          tradingName: tradingName.value,
        }
      });
    } else {
      throw 'Tipo de pessoa inválido';
    }

    if (response.status === 200) {
      console.log('Response data:', response.data);
      alert('Pessoa atualizada com sucesso!');
      router.push('/listPerson'); 
    } else {
      alert('Falha ao atualizar pessoa.');
    }
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error);
    alert('Erro ao atualizar pessoa. Por favor, tente novamente mais tarde.');
  }
};

onMounted(fetchPersonDetails);
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

button:hover {
  background-color: #0056b3;
}

.login-form {
  max-width: 50%;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  font-size: 18px;
  color: #000;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 5px;
}
</style>
