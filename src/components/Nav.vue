<template>
  <nav>
    <div class="site-title">
      <RouterLink :to="{ name: 'home' }">
        <h1>SMITH blog</h1>
        <p>The new blog in town</p>
      </RouterLink>
    </div>
    <ul>
      <li><RouterLink :to="{ name: 'home' }">Blogs</RouterLink></li>
      <li><RouterLink :to="{ name: 'about' }">About</RouterLink></li>
      <li><RouterLink :to="{ name: 'newblog' }">New Blog</RouterLink></li>
    </ul>
    <div class="auth-links">
      <RouterLink :to="{ name: 'signin' }" v-if="!isLoggedIn"
        >Sign In</RouterLink
      >
      <div v-if="isLoggedIn" class="user-info">
        <p>Welcome, {{ userName }}!</p>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/store/authStore";
//import { ref } from "vue";

const { isLoggedIn, userName, logout } = useAuthStore();
</script>

<style lang="scss">
nav {
  display: flex;
  justify-content: space-between; /* Change to space-between to separate navigation from auth links */
  align-items: center; /* Vertically center the content */
  margin-bottom: 60px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  text-transform: uppercase;
}

nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically center the navigation links */
  margin-right: 20px; /* Add some space to the right of the navigation links */
}

nav li {
  list-style-type: none;
  margin-left: 20px;
}

nav h1 {
  font-size: 3em;
}

nav p,
nav a {
  color: #777;
  font-weight: 300;
}

/* Style for the auth links */
.auth-links {
  display: flex;
  align-items: center;
}

.auth-links a {
  margin-left: 20px;
  color: #333;
  text-decoration: none; /* Remove underline from the links */
  font-weight: 500; /* Make the links slightly bold */
}

/* Style for the auth links on hover */
.auth-links a:hover {
  color: #555; /* Change the color on hover */
}
.user-info {
  display: flex;
  align-items: center;
}

.user-info p {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}

.logout-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease-in-out;
}

.logout-button:hover {
  background-color: #0056b3;
}
</style>
