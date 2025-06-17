<template>
  <div style="display: flex;">
    <MySidebar1 />
    <div class="dashboard">
      <h1 style="color:#78A55A; margin-left: 16px;">Dashboard</h1>
      <SummaryCards1 />
      <TransactionsTable1 />
    </div>
  </div>
</template>

<script>
import MySidebar1 from "./components/Sidebar.vue";
import SummaryCards1 from "./components/SummaryCards.vue";
import TransactionsTable1 from "./components/TransactionTable.vue";

export default {
  name: "App",
  components: {
    MySidebar1,
    SummaryCards1,
    TransactionsTable1
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

body {
  margin: 0;
  background-color: #0e0f10;
  color: white;
  font-family: 'Roboto', sans-serif;
}
</style>
<style>
.dashboard{
  width:100%;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 19px;
}
</style>
