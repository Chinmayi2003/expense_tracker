<template>
  <div class="sidebar">
    <div class="nav-elements">
      <div class="profile-header">
        <img :src="require('@/assets/Profile-icon.svg')" alt="Profile Icon" class="profile-icon" />
        <h2 class="profile-name">John</h2>
      </div>

      <div
        class="nav-icons"
        v-for="(item, index) in navItems"
        :key="index"
        :class="{ active: isActive(item.routeName) }"
        @click="item.func"
      >
        <img
          :src="require(`@/assets/${item.icon}`)"
          :alt="item.label"
          :id="item.id"
          :style="{ width: item.width, height: item.height }"
        />
        <div class="menu-item" :style="{ marginLeft: item.marginLeft }">{{ item.label }}</div>
      </div>
    </div>

    <div class="expense-tracker-logo">
      <img :src="require('@/assets/Expense-tracker-logo.svg')" class="expense-tracker-icon" />
    </div>
  </div>
</template>


<script>
import { auth } from "@/firebase";

export default {
  name: "MySidebar1",
  methods: {
    isActive(routeName) {
      return this.$route.name === routeName;
    }
  },
  data() {
    return {
      navItems: [
        {
          label: "Dashboard",
          icon: "Dashboard-icon.svg",
          marginLeft: "14px",
          width: "23px",
          height: "23px",
          routeName: "dashboard",
          func: () => {
            if (this.$route.name !== "dashboard") {
              this.$router.push({ name: "dashboard" });
            }
          }
        },
        {
          label: "Analytics",
          icon: "Analytics-icon.svg",
          id: "analytics-icon",
          marginLeft: "12.5px",
          width: "28.5px",
          routeName: "analytics",
          func: () => {
            if (this.$route.name !== "analytics") {
              this.$router.push({ name: "analytics" });
            }
          }
        },
        {
          label: "Settings",
          icon: "settings-icon.svg",
          marginLeft: "14px",
          width: "24.8px",
          height: "26px",
          routeName: "setting",
          func: () => {
            if (this.$route.name !== "setting") {
              this.$router.push({ name: "setting" });
            }
          }
        },
        {
          label: "Logout",
          icon: "Logout-icon.svg",
          marginLeft: "15px",
          width: "22px",
          height: "21px",
          id: "logout-icon",
          func: () => {
            auth.signOut().then(() => {
              this.$router.push({ name: "login" });
            });
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
  .sidebar {
    width: 11.7vw;
    height: 93.9vh;
    background-color: #0d0d0d;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
  }
  .nav-elements {
    padding-left: 10px;
  }

  .expense-tracker-logo {
    margin: 0 0 3px 7px;
  }

  .expense-tracker-icon {
    width: 70px;
    height: 70px;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-direction: row;
    margin: 3px 0 43px -4px;
  }

  .profile-name {
    font-size: 19.5px;
    font-weight: bold;
    margin: 34px 0 7px -2.5px;
    width: 10px;
  }

  .nav-icons {
    display: flex;
    align-items: center;
    margin-bottom: -11px;
    transition: transform 0.15s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .nav-icons .menu-item {
    color: white;
  }

  .nav-icons.active img {
    filter: invert(50%) sepia(40%) saturate(600%) hue-rotate(65deg)
      brightness(90%) contrast(85%);
  }

  .nav-icons.active .menu-item {
    color: #78a55a;
  }

  .menu-item {
    margin: 20px 0;
    font-weight: 400;
    opacity: 0.9;
    color: #fff;
  }

  #analytics-icon {
    margin-left: -3px;
  }

  #logout-icon {
    margin-left: 3px;
  }

  .dashboard-nav-icon,
  .Analytic-nav-icon,
  .Settings-nav-icon,
  .Logout-nav-icon {
    fill: #c1bfd9;
  }

  .nav-icons:hover img {
    filter: invert(50%) sepia(40%) saturate(600%) hue-rotate(65deg)
      brightness(90%) contrast(85%);
  }

  .nav-icons:hover .menu-item {
    color: #78a55a;
    filter: drop-shadow(0 0 4px rgba(120, 165, 90, 0.2));
  }
</style>