<template>
    <div class="sidebar-container">
      <div class="logo">
        <img src="" alt="Logo">
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Tasks</a></li>
          <li><a href="#">Reports</a></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import axios from "axios";

const router = useRouter();

  export default {
    name: 'SidebarComponent'
    
  }
  </script>
  
  <style scoped>
  .sidebar-container {
    /* styles for the overall sidebar container */
  }
  
  .logo {
    /* styles for the logo */
  }
  
  .sidebar-nav {
    /* styles for the sidebar navigation */
  }
  
  .sidebar-nav ul {
    /* styles for the navigation list */
  }
  
  .sidebar-nav li {
    /* styles for the navigation list items */
  }
  
  .sidebar-nav a {
    /* styles for the navigation links */
  }
  </style>