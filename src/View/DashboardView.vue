<template>
  <div class="dashboard">
    <h1 class="dashboard-header">Dashboard</h1>
    <SummaryCards1 class="card-spacing" />
    <TransactionsTable1 />
  </div>
</template>

<script>
import SummaryCards1 from "@/components/SummaryCards.vue";
import TransactionsTable1 from "@/components/TransactionTable.vue";

export default {
 components: {
  SummaryCards1,
  TransactionsTable1
 }
}
</script>

<style scoped>
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