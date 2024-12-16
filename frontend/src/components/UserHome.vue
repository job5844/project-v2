<template>
  <a-layout>
    <a-layout-header class="header" style="background-color: #1890ff; display: flex; align-items: center; padding: 0 24px;">
      <div class="logo" style="width: 120px; height: 31px; background: rgba(255, 255, 255, 0.3); margin-right: 24px;"></div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ 
          backgroundColor: '#1890ff', 
          borderBottom: 'none', 
          flex: 1, 
          minHeight: '64px',
          display: 'flex',
          alignItems: 'center'
        }"
      >
        <a-menu-item key="home" style="margin: 0 15px;">คลังสินค้าและ POS</a-menu-item>
      </a-menu>
      <div class="user-info" style="display: flex; align-items: center; color: white;">
        <a-avatar 
          :size="40" 
          style="background-color: #ff6f00; margin-right: 10px;"
        >
          {{ userInitials }}
        </a-avatar>
        <div>
          <div style="font-weight: bold; line-height: 1.2;">{{ userName }}</div>
          <div style="font-size: 0.8em; color: rgba(255,255,255,0.7);">{{ userRole }}</div>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :selectedKeys="selectedKeys1"
            :openKeys="openKeys"
            style="height: 100%"
          >
            <a-sub-menu key="sub1">
              <template #title>
                <user-outlined />
                <span>คลังสินค้า</span>
              </template>
              <a-menu-item key="1">Stock Overviewç</a-menu-item>
              <a-menu-item key="2">Add Product</a-menu-item>
              <a-menu-item key="3">Inventory Report</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <laptop-outlined />
                <span>POS System</span>
              </template>
              <a-menu-item key="5">Sales</a-menu-item>
              <a-menu-item key="6">Transactions</a-menu-item>
              <a-menu-item key="7">Payment</a-menu-item>
              <a-menu-item key="8">Refunds</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <notification-outlined />
                <span>Reporting</span>
              </template>
              <a-menu-item key="9">Sales Report</a-menu-item>
              <a-menu-item key="10">Inventory Report</a-menu-item>
              <a-menu-item key="11">Customer Report</a-menu-item>
              <a-menu-item key="12">Financial Summary</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-card 
                title="Stock Overview" 
                :headStyle="{ backgroundColor: '#ff6f00', color: 'white' }"
                hoverable
              >
                <p>Total Products: 250</p>
                <p>Low Stock Items: 15</p>
                <p>Value of Inventory: $45,000</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card 
                title="Sales Summary" 
                :headStyle="{ backgroundColor: '#ff6f00', color: 'white' }"
                hoverable
              >
                <p>Today's Sales: $5,420</p>
                <p>This Month: $82,350</p>
                <p>Best Selling Product: Laptop</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card 
                title="Recent Transactions" 
                :headStyle="{ backgroundColor: '#ff6f00', color: 'white' }"
                hoverable
              >
                <p>Recent Sale 1: $1,200</p>
                <p>Recent Sale 2: $890</p>
                <p>Recent Sale 3: $1,500</p>
              </a-card>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center; background-color: #1890ff; color: white;">
      Inventory Management System ©2024
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';

// User state
const userName = ref('สมชาย แสนดี');
const userRole = ref('พนักงาน');

// Computed property to get user initials
const userInitials = computed(() => {
  const names = userName.value.split(' ');
  return names.map(name => name.charAt(0)).join('').toUpperCase();
});

const selectedKeys1 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
</script>

<style scoped>
/* Remove default border and padding from menu items */
.ant-menu-horizontal > .ant-menu-item {
  margin: 0;
  padding: 0 15px;
}

.ant-menu-horizontal > .ant-menu-item:hover {
  background-color: rgba(255,255,255,0.1);
}
</style>