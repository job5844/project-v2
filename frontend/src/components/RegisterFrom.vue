<template>
  <div class="register-form">
    <form @submit.prevent="handleRegister">
      <h2>สมัครสมาชิก</h2>
      
      <!-- ฟอร์มเดิม -->
      <div class="form-group">
        <label>ชื่อ</label>
        <input 
          type="text" 
          v-model="firstname" 
          required 
          :class="{ 'error': errors.firstname }"
        >
        <span class="error-message" v-if="errors.firstname">{{ errors.firstname }}</span>
      </div>

      <div class="form-group">
        <label>นามสกุล</label>
        <input 
          type="text" 
          v-model="lastname" 
          required
          :class="{ 'error': errors.lastname }"
        >
        <span class="error-message" v-if="errors.lastname">{{ errors.lastname }}</span>
      </div>

      <div class="form-group">
        <label>ชื่อผู้ใช้</label>
        <input 
          type="text" 
          v-model="username" 
          required
          maxlength="15"
          :class="{ 'error': errors.username }"
        >
        <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label>รหัสผ่าน</label>
        <input 
          type="password" 
          v-model="password" 
          required
          :class="{ 'error': errors.password }"
        >
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label>เบอร์โทรศัพท์</label>
        <input 
          type="tel" 
          v-model="phone" 
          required
          maxlength="10"
          pattern="[0-9]{10}"
          :class="{ 'error': errors.phone }"
        >
        <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
      </div>

      <!-- เพิ่ม dropdown สำหรับเลือก role -->
      <div class="form-group">
        <label>ประเภทผู้ใช้</label>
        <select 
          v-model="selectedRole" 
          required
          :class="{ 'error': errors.role }"
        >
          <option value="">กรุณาเลือกประเภทผู้ใช้</option>
          <option value="USER">พนักงาน</option>
          <option value="ADMIN">ผู้ดูแลระบบ</option>
        </select>
        <span class="error-message" v-if="errors.role">{{ errors.role }}</span>
      </div>

      <button type="submit">สมัครสมาชิก</button>
      <div class="text-center mt-4">
        <a-typography-text>
          มีบัญชีแล้ว
          <router-link to="/login" class="text-blue-600">
            เข้าสู่ระบบ
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
      firstname: '',
      lastname: '',
      phone: '',
      selectedRole: '', // เพิ่ม state สำหรับเก็บค่า role ที่เลือก
      error: null,
      errors: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        role: ''
      }
    }
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        role: ''
      };

      if (!this.username || this.username.length > 15) {
        this.errors.username = 'ชื่อผู้ใช้ต้องมีความยาวไม่เกิน 15 ตัวอักษร';
        isValid = false;
      }

      if (!this.firstname) {
        this.errors.firstname = 'กรุณากรอกชื่อ';
        isValid = false;
      }

      if (!this.lastname) {
        this.errors.lastname = 'กรุณากรอกนามสกุล';
        isValid = false;
      }

      if (!this.phone || this.phone.length !== 10) {
        this.errors.phone = 'เบอร์โทรศัพท์ต้องมี 10 หลัก';
        isValid = false;
      }

      if (!this.password || this.password.length < 6 || this.password.length > 10) {
        this.errors.password = 'รหัสผ่านต้องมีความยาว 6-10 ตัวอักษร';
        isValid = false;
      }

      if (!this.selectedRole) {
        this.errors.role = 'กรุณาเลือกประเภทผู้ใช้';
        isValid = false;
      }

      return isValid;
    },
    async handleRegister() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            role: this.selectedRole // ส่งค่า role ไปด้วย
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'การลงทะเบียนล้มเหลว');
        }

        this.$router.push('/login');
      } catch (error) {
        this.error = error.message;
      }
    }
  }
}
</script>

<style scoped>
.register-form {
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

input, select {
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