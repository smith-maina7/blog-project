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
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <button type="submit" v-if="!isLoggedIn">Sign In</button>
    </form>
    <router-link :to="{ name: 'signup' }"> Register </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref("");

let isLoggedIn = authStore.isLoggedIn;

const signIn = async () => {
  try {
    const apiUrl = "http://localhost:3000/login";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }), // Include cookies in the request and response
    });
    if (response.status === 200) {
      const user = await response.json();
      authStore.login(user);

      router.push({ name: "home" });
      return true;
    } else {
      // Handle server-side errors
      const data = await response.json();
      if (data.errors) {
        errorMessage.value =
          data.errors.email || data.errors.password || "Unknown error";
        return false;
      } else {
        console.log("incorrect email or password");
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
  margin-bottom: 20px;
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
a {
  color: #777;
  margin-top: 20px;
  color: #333;
  text-decoration: none; /* Remove underline from the links */
  font-weight: 700;
}
a:hover {
  color: #555;
}
</style>
