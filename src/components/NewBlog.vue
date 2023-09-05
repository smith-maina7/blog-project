<template>
  <div class="create-blog">
    <form @submit.prevent="submiteBlog">
      <label for="title"> Blog title</label>
      <input
        v-model="blogData.title"
        type="text"
        id="title"
        name="title"
        required
      />
      <label for="snippet">Snippet</label>
      <input
        v-model="blogData.snippet"
        type="text"
        id="snippet"
        name="snippet"
        required
      />
      <label for="body">Blog body</label>
      <textarea
        v-model="blogData.body"
        name="body"
        id="body"
        cols="30"
        rows="10"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// setting up the state that data from the form will be stored in.
// data bind the state to the form blogDate.title to the title etc.
const blogData = ref({
  title: "",
  snippet: "",
  body: "",
});

// setting up an async function that will be called when the form is submitted.
// note that the function will have to argument the, the url endpoint and an abject that configures the request, it will have the the method, headers{'content-type': 'application/json'} and the body with the .stringify('state.value') that converts the data into a JSON string.
const submiteBlog = async () => {
  try {
    const apiUrl = "http://localhost:3000/newblogs";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData.value),
    });
    if (response.status === 200) {
      console.log("blog successfully added");
      router.push({ name: "home" });
    } else {
      console.log("blog failed to add");
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped>
.create-blog {
  height: 100vh;
}
.create-blog form {
  max-width: 400px;
  margin: 0 auto;
}
.create-blog input,
.create-blog textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  color: #222;
}
.create-blog label {
  display: block;
  margin-top: 20px;
}
textarea {
  height: 120px;
}
.create-blog button {
  margin-top: 20px;
  background-color: crimson;
  color: white;
  padding: 6px;
  border: 0;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 4px;
}
</style>
