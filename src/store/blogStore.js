import { defineStore } from "pinia";

export const useBlogStore = defineStore("blogs", {
  state: () => ({
    blogs: [],
    isLoading: false,
  }),
  getters: {
    async fetchBlogs() {
      try {
        this.isLoading = true;
        const apiUrl = "http://localhost:3000/blogs";
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        this.blogs = await response.json(); // Update the reactive data property
      } catch (error) {
        console.log("Fetch error:", error);
      }
      {
        this.isLoading = false;
      }
    },
  },
});
