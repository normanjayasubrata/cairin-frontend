<template>
  <nav class="nav-container">
    <span class="nav-username">Welcome, {{ userName }}</span>
    <button class="nav-button" @click="logout">Log Out</button>
  </nav>
</template>

<script>
export default {
  // Component code
  name: 'NavBar',
  data() {
    return {
      userName: localStorage.getItem("name")
    }
  },
  methods: {
    // Other methods

    logout() {
      // Clear the token and name from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('name');

      // Redirect to the home page
      window.location.href = '/';
    }
  }
};
</script>

<style>
.nav-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: solid black 2px;
  margin-bottom: 50px;
  margin-top: 2px;
  padding: 10px;
}
.nav-username {
  margin-right: 50px;
}
.nav-button {
  margin-right: 50px;
  border-radius: 10px;
  padding: 10px;
}
</style>