<template>
  <div style="display: flex;" >
    <MySidebar1></MySidebar1>
    <AddExpense></AddExpense>
  </div>
</template>

<script>
import AddExpense from './components/Add-expense.vue';
import MySidebar1 from "./components/Sidebar.vue";


export default {
  name: 'App',
  components: {
    MySidebar1,
    AddExpense
  }
}
</script>

<style>
</style>
