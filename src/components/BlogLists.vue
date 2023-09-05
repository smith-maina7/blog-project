<template>
  <div>
    <h1>My Blogs</h1>
    <div class="loading" v-if="isLoading">Loading</div>
    <div class="blogs" v-for="blog in blogs" :key="blog._id">
      <RouterLink :to="/blog/ + blog._id">
        <h2 v-if="blogs">{{ blog.title }}</h2>
      </RouterLink>
      <p v-if="blogs">{{ blog.snippet }} id: {{ blog._id }}</p>
      <button @click="deleteBlog(blog._id)" class="delete-button">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { useRoute } from "vue-router";

const blogs = ref([]);
const isLoading = ref(false);
// const route = useRoute();

const fetchingBlogPosts = async () => {
  try {
    isLoading.value = true;
    const apiUrl = "http://localhost:3000/blogs";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    blogs.value = await response.json(); // Update the reactive data property
  } catch (error) {
    console.log("Fetch error:", error);
  }
  {
    isLoading.value = false;
  }
};

onMounted(fetchingBlogPosts);

// detele functionality
const deleteBlog = async (blogId) => {
  try {
    console.log(blogId);
    const apiUrl = `http://localhost:3000/blogs/${blogId}`;
    const response = await fetch(apiUrl, { method: "DELETE" });
    if (response.status === 200) {
      console.log("successfully deleted blog ");
      window.location.reload();
    }
  } catch (err) {
    console.log("Failed to delete" + err);
  }
};
</script>

<style lang="scss" scoped>
// In your Vue component
@import "@fortawesome/fontawesome-free/css/all.css";

h2 {
  cursor: pointer;
}
/* Your component's CSS or SCSS */
.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: red; /* Icon color */
}

.material-icons {
  font-size: 24px; /* Adjust the icon size as needed */
  margin-right: 8px; /* Adjust the spacing between the icon and text */
}
</style>
