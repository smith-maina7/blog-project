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
  </nav>
</template>

<script setup></script>
<style lang="scss">
nav {
  display: flex;
  justify-content: space-around;
  margin-bottom: 60px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  text-transform: uppercase;
}
nav ul {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
</style>
