import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null, // This will hold the user object if logged in
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userName: (state) => (state.user ? state.user.name : ""),
  },
  actions: {
    login(user) {
      // Simulate a login process
      this.user = user;
    },
    signup(user) {
      // Set the user object in the state upon signup
      this.user = user;
    },

    logout() {
      // Simulate a logout process
      this.user = null;
    },
  },
});
