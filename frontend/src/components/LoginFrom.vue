<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <h2>เข้าสู่ระบบ</h2>

      <div class="form-group">
        <label>ชื่อผู้ใช้</label>
        <input type="text" v-model="username" required :class="{ 'error': errors.username }">
        <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label>รหัสผ่าน</label>
        <input type="password" v-model="password" required :class="{ 'error': errors.password }">
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <button type="submit">เข้าสู่ระบบ</button>
      <div class="text-center mt-4">
        <a-typography-text>
          ยังไม่มีบัญชี?
          <router-link to="/register" class="text-blue-600">
            สมัครสมาชิก
          </router-link>
        </a-typography-text>
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      errors: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        username: '',
        password: ''
      };

      if (!this.username) {
        this.errors.username = 'กรุณากรอกชื่อผู้ใช้';
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = 'กรุณากรอกรหัสผ่าน';
        isValid = false;
      }

      return isValid;
    },
    async handleLogin() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'การเข้าสู่ระบบล้มเหลว');
        }

        // เก็บ token และข้อมูล user ใน localStorage
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // นำทางไปหน้า dashboard หรือหน้าหลัก
        if (data.user.role === 'ADMIN') {
          this.$router.push('/AdminHome');
        } else {
          this.$router.push('/UserHome');
        }
      } catch (error) {
        this.error = error.message;
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>