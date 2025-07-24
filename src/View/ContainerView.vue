<template>
  <div>
      <div>
      <div class="overlay" v-show="showLogoutPopup">
        <LogoutPopup :show="showLogoutPopup" @confirm="confirmLogout" @cancel="cancelLogout" />
      </div>
      </div>
        <div class="analytics" style="display: flex">
        <MySidebar :userName="userName" @logoutPopup="logoutPopupHandler" />
        <router-view @changeUserName="userNameHandler"></router-view>
</div>

</div>
</template>

<script>
import MySidebar from "@/components/Sidebar.vue";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import LogoutPopup from "@/components/LogoutPopup.vue";

export default {
    components: {
        MySidebar,
        LogoutPopup
    },
    data() {
    return {
      showLogoutPopup: false,
      userName: ''
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userName = user.displayName || "User";
      }
    });
  },
  methods: {
    userNameHandler(val) {
      this.userName = val
    },
    logoutPopupHandler(val) {
      this.showLogoutPopup = val;
    },
  async confirmLogout() {
    try {
      const auth = getAuth();
      await signOut(auth); // ✅ SIGN OUT from Firebase
      this.showLogoutPopup = false;
      this.$router.push({ name: "login" }); // ✅ Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
    cancelLogout() {
      this.showLogoutPopup = false;
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 104;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.analytics {
    display: flex;
    font-family: "Roboto", sans-serif;
    background: #141414;
    color: white;
    height: 100vh;
    overflow-y: hidden;
}
</style>
