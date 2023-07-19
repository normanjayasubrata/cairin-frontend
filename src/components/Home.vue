<template>
  <div class="home-container">
    <h2 v-if="!showSignUp">Login</h2>
    <h2 v-else>Sign Up</h2>

    <form v-if="!showSignUp" @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="loginData.username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="loginData.password" required>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>

    <form v-else @submit.prevent="signup">
      <!-- Sign up form fields -->
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="signupData.name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="signupData.email" required>
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="signupData.username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="signupData.password" required>
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>

    <!-- Toggle between login and sign up forms -->
    <p v-if="!showSignUp">
      Don't have an account yet? Please
      <button @click="showSignUp = true">Sign Up</button>
    </p>
    <p v-else>
      Already have an account? Please
      <button @click="showSignUp = false">Sign In</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppHome',
  data() {
    return {
      showSignUp: false,
      loginData: {
        username: '',
        password: '',
      },
      signupData: {
        username: '',
        password: '',
        name: '',
        email: '',
      },
    };
  },
  methods: {
    login() {
      if (this.validateLoginForm()) {
        const formData = new URLSearchParams();
        formData.append('username', this.loginData.username);
        formData.append('password', this.loginData.password);

        axios
            .post('http://localhost:8080/api/users/login', formData, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
            .then(response => {
              const token = response.data.token;
              const name = response.data.name;

              // Save the token in localStorage or cookies
              localStorage.setItem('token', token); // Using localStorage
              localStorage.setItem('name', name); // Using localStorage

              // Redirect the browser to /list-user
              window.location.href = '/list-user';
            })
            .catch(error => {
              console.error(error);
            });
      } else {
        console.error('Please fill in all fields.');
      }
    },
    signup() {
      if (this.validateSignUpForm()) {
        axios
            .post('http://localhost:8080/api/users/register', this.signupData)
            .then(() => {
              window.location.href = '/';
            })
            .catch(error => {
              alert(error.message);
              console.error(error);
            });
      } else {
        console.error('Please fill in all fields.');
      }
    },
    validateSignUpForm() {
      // Check if all fields in the signup form are filled
      return (
          this.signupData.username &&
          this.signupData.password &&
          this.signupData.name &&
          this.signupData.email
      );
    },
    validateLoginForm() {
      // Check if all fields in the signup form are filled
      return (
          this.loginData.username &&
          this.loginData.password
      );
    },
  },
};
</script>

<style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid black 2px;
  border-radius: 20px;
  width: 300px;
  /*height: 300px;*/
  margin-bottom: 30px;
  padding: 20px 0 20px 0;
}

form div {
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 0;
}

button {
  padding: 10px;
}
</style>