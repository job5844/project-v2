<!-- src/views/LoginPage.vue -->
<template>
    <div class="login-page">
      <RegisterFrom />
    </div>
  </template>
  
  <script setup>
import RegisterFrom from '../components/RegisterFrom.vue'
</script>
  
  <style scoped>
  .login-page {
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  </style>