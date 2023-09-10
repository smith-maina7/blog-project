<template>
  <div class="auth-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const signUp = async () => {
  try {
    const apiUrl = "http://localhost:3000/users";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    });
    if (response.status === 200) {
      console.log("blog successfully added");
      router.push({ name: "home" });
    } else {
      // Handle server-side errors
      const data = await response.json();
      if (data.errors) {
        errorMessage.value =
          data.errors.email || data.errors.password || "Unknown error";
      } else {
        console.log("failed to add user");
      }
    }
  } catch (err) {
    console.log(err);
  }
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

input[type="text"],
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
.error-message {
  color: #ff0000; /* Red color for error messages */
  font-size: 14px; /* Adjust the font size as needed */
  margin-top: 5px; /* Add spacing above the error message */
  font-weight: bold; /* Make the text bold */
  background-color: #ffeeee; /* Light pink background color */
  padding: 5px; /* Add padding for better readability */
}
</style>
