<template>
  <!-- <LoginForm/> -->
  <div style="display: flex;">
    <MySidebar1 />
      <div class="settings">
        <SettingsPage/>
      </div>
   </div>
</template>

<script>
import SettingsPage from './components/UserSettings.vue'
import MySidebar1 from "./components/Sidebar.vue";

export default {
  name: 'App',
  components:
  // { LoginForm }
  { MySidebar1, SettingsPage }
}
</script>

<style>
body {
  background-color: #141414;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.settings {
   height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  width:90%
}
</style>
