<template>
  <div style="display: flex;" >
    <MySidebar1></MySidebar1>
    <AddExpense></AddExpense>
  </div>
</template>

<script>
import AddExpense from './components/Add-expense.vue';
import MySidebar1 from "./components/Sidebar.vue";
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    MySidebar1,
    AddExpense
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
