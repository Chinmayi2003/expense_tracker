<template>
  <div>
    <div class="sidebar" v-if="!isMobile">
      <div class="nav-elements">
        <div class="profile-header">
          <img :src="require('@/assets/Profile-icon.svg')" alt="Profile Icon" class="profile-icon" />
          <h2 class="profile-name">John</h2>
        </div>
        <div class="nav-icons" v-for="(item, index) in navItems" :key="index"
          :class="{ active: isActive(item.routeName) }" @click="item.func">
          <img :src="require(`@/assets/${item.icon}`)" :alt="item.label" :id="item.id"
            :style="{ width: item.width, height: item.height }" />
          <div class="menu-item">{{ item.label }}</div>
        </div>
      </div>

      <div class="expense-tracker-logo">
        <img :src="require('@/assets/expensetrackerlogo.svg')" class="expense-tracker-icon" />
      </div>
    </div>
    <div class="bottom-nav" v-if="isMobile">
      <div class="bottom-icon" v-for="(item, index) in navItems" :key="index"
        :class="{ active: isActive(item.routeName) }" @click="item.func">
        <img :src="require(`@/assets/${item.icon}`)" :alt="item.label" style="width: 24px; height: 24px" />
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "MySidebar1",
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      navItems: [
        {
          label: "Dashboard",
          icon: "dashboardicon.svg",
          routeName: "dashboard",
          height: "20px",
          func: () => {
            if (this.$route.name !== "dashboard") {
              this.$router.push({ name: "dashboard" });
            }
          }
        },
        {
          label: "Analytics",
          icon: "analyticsicon.svg",
          id: "analytics-icon",
          routeName: "analytics",
          height: "20px",
          func: () => {
            if (this.$route.name !== "analytics") {
              this.$router.push({ name: "analytics" });
            }
          }
        },
        {
          label: "Settings",
          icon: "settingsicon.svg",
          routeName: "setting",
          height: "21px",
          func: () => {
            if (this.$route.name !== "setting") {
              this.$router.push({ name: "setting" });
            }
          }
        },
        {
          label: "Logout",
          icon: "logouticon.svg",
          routeName: "logout",
          height: "20px",
          id: "logout-icon",
          margin: "10px",
          func: () => {
            auth.signOut().then(() => {
              this.$router.push({ name: "login" });
            });
          }
        }
      ]
    };
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    isActive(routeName) {
      return this.$route.name === routeName;
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
    }
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
    top: 0;
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
    margin-left: 12px;
  }

  .nav-icons.active img {
    filter: invert(50%) sepia(40%) saturate(600%) hue-rotate(65deg) brightness(90%) contrast(85%);
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

  .nav-icons:hover img {
    filter: invert(50%) sepia(40%) saturate(600%) hue-rotate(65deg) brightness(90%) contrast(85%);
  }

  .nav-icons:hover .menu-item {
    color: #78a55a;
    filter: drop-shadow(0 0 4px rgba(120, 165, 90, 0.2));
  }

  #logout-icon {
    padding-left: 2.5px;
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #0d0d0d;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .bottom-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .bottom-icon.active img {
    filter: invert(50%) sepia(40%) saturate(600%) hue-rotate(65deg) brightness(90%) contrast(85%);
  }

  @media (max-width: 600px) {
    .sidebar {
      display: none;
    }
  }
</style>
