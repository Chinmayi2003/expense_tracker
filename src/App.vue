<template>
  <div style="display: flex">
    <MySidebar1 />
    <!-- <AddExpense></AddExpense> -->
    <div class="dashboard">
      <h1 class="dashboard-header">Dashboard</h1>
      <SummaryCards1 class="card-spacing" />
      <TransactionsTable1 />
    </div>
  </div>
</template>

<script>
// import AddExpense from "./components/Add-expense.vue";
import MySidebar1 from "./components/Sidebar.vue";
import SummaryCards1 from "./components/SummaryCards.vue";
import TransactionsTable1 from "./components/TransactionTable.vue";

export default {
  name: "App",
  components: {
    MySidebar1,
    // AddExpense,
    SummaryCards1,
    TransactionsTable1,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

body {
  margin: 0;
  background-color: #0e0f10;
  color: white;
  font-family: "Roboto", sans-serif;
}
</style>

<style>
.dashboard {
  width: 100%;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 19px;
}
.dashboard-header {
  color: #78a55a;
  margin-left: 16px;
}
.card-spacing {
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 20px;
}
</style>
