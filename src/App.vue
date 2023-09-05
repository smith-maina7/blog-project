<template>
  <Nav />
  <router-view />
  <Footer />
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Roboto+Condensed:wght@300&display=swap");
body {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  font-family: roboto condensed, "Helvetica Neue", Helvetica, sans-serif;
}
p,
h1,
h2,
h3,
a,
ul {
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #222;
}
.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #777;
}
</style>
