<template>
  <div class="auth-container">
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const signIn = () => {
  // Implement your sign-in logic here
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
