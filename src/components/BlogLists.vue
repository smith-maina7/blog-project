<template>
  <div>
    <h1>My Blogs</h1>
    <div class="loading" v-if="blogStore.isLoading">Loading....</div>
    <div class="blogs" v-for="blog in blogStore.blogs" :key="blog._id">
      <RouterLink :to="/blog/ + blog._id">
        <h2 v-if="blogStore.blogs">{{ blog.title }}</h2>
      </RouterLink>
      <p v-if="blogStore.blogs">{{ blog.snippet }} id: {{ blog._id }}</p>
      <button @click="deleteBlog(blog._id)" class="delete-button">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
// import { onMounted } from "vue";
import { useBlogStore } from "@/store/blogStore";

//USING PINIA TO GET THE BLOGS FROM THE DB.
const blogStore = useBlogStore();

blogStore.fetchBlogs;

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
