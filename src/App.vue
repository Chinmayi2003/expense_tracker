<template>
  <!-- <LoginForm/> -->
  <div style="display: flex;">
    <MySidebar1 />
   <SettingsPage/>
   </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import SettingsPage from './components/UserSettings.vue'
// import LoginForm from './components/Login.vue'
import MySidebar1 from "./components/Sidebar.vue";

export default {
  name: 'App',
  components:
  //  {
  //   LoginForm
  // }
  {    MySidebar1,SettingsPage}
}
</script>

<style>

</style>
