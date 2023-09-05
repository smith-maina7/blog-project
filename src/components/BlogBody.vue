<template>
  <div>
    <!-- Display loading indicator when isLoading is true -->
    <div v-if="isLoading" class="loading">Loading...</div>

    <!-- Display blog content when isLoading is false -->
    <div v-else>
      <h2 v-if="blogBody">{{ blogBody.title }}</h2>
      <p v-if="blogBody">{{ blogBody.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const blogBody = ref(null);
const route = useRoute();
const isLoading = ref(false);

const fetchBlog = async () => {
  try {
    isLoading.value = true;
    const blogId = route.params.id;
    const apiUrl = `http://localhost:3000/blogs/${blogId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    blogBody.value = await response.json();
  } catch (err) {
    console.log(err);
  }
  {
    isLoading.value = false;
  }
};

onMounted(fetchBlog);
</script>

<style lang="scss" scoped></style>
