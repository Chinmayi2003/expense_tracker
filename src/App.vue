<template>
  <div>
    <router-view></router-view>
    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

body {
  margin: 0;
  background-color: #0e0f10;
  color: white;
  font-family: "Roboto", sans-serif;
}
</style>
