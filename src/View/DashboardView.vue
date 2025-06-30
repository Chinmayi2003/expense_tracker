<template>
  <div class="dashboard">
    <div :class="['blur-content', { 'blur-background': blurDashboard }]">
      <h1 class="dashboard-header">Dashboard</h1>
      <SummaryCards1 class="card-spacing" />
      <TransactionsTable1
        @request-blur="blurDashboard = true"
        @request-unblur="blurDashboard = false"
      />
    </div>
    <teleport to="#modals">
      <AddExpense v-if="blurDashboard" :editData="editTransactionData"  @close="closeExpenseModal" @update="handleUpdate"  />
    </teleport>
  </div>
</template>
<script>
import SummaryCards1 from "@/components/SummaryCards.vue";
import TransactionsTable1 from "@/components/TransactionTable.vue";
import AddExpense from "@/components/Add-expense.vue";
export default {
  components: {
    SummaryCards1,
    TransactionsTable1,
    AddExpense,
  },
  data() {
    return {
      blurDashboard: false,
    };
  },
  watch: {
    blurDashboard(newVal) {
      if (newVal) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    },
  },
  methods: {
    closeExpenseModal() {
      this.blurDashboard = false;
    },
  },
};
</script>
 
<style scoped>
.dashboard {
  width: 100%;
  margin: 30px 10px 19px 10px;
}
 
.dashboard-header {
  color: #78a55a;
  margin-left: 16px;
}
 
.card-spacing {
  margin: 0 15px 20px 15px;
}
 
.blur-content {
  transition: filter 0.3s ease-in-out;
}
.blur-background {
 
  filter: blur(5px);
}
</style>