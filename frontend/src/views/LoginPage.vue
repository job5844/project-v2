<!-- src/views/LoginPage.vue -->
<template>
    <div class="login-page">
      <LoginForm />
    </div>
  </template>
  
  <script setup>
import LoginForm from '../components/LoginFrom.vue'
</script>
  
  <style scoped>
  .login-page {
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  </style>