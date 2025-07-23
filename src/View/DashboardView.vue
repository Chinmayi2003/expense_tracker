<template>
  <div class="dashboard">
    <div :class="['blur-content', { 'blur-background': blurDashboard }]">
      <h1 class="dashboard-header">Dashboard</h1>
      <SummaryCards1 class="card-spacing" />
      <TransactionsTable1 @toggle-blur="handleBlurToggle" @edit-transaction="openEditDialog" />
    </div>
    <Portal to="modals">
      <AddExpense
        v-show="blurDashboard"
        :show="blurDashboard"
        :editData="editTransactionData"
        @close="closeExpenseModal"
        @clearEditData="editTransactionData = {}"
      />
    </Portal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SummaryCards1 from "@/components/SummaryCards.vue";
import TransactionsTable1 from "@/components/TransactionTable.vue";
import AddExpense from "@/components/AddExpense.vue";

export default {
  computed: {
    ...mapGetters(["getTransactions"])
  },
  components: {
    SummaryCards1,
    TransactionsTable1,
    AddExpense
  },
  data() {
    return {
      blurDashboard: false,
      editTransactionData: {}
    };
  },
  watch: {
    blurDashboard(newVal) {
      document.body.classList.toggle("no-scroll", newVal);
    }
  },
  methods: {
    closeExpenseModal() {
      this.blurDashboard = false;
      this.editTransactionData = null;
    },
    openEditDialog(data) {
      this.editTransactionData = { ...data };
      this.blurDashboard = true;
    },
    openAddDialog() {
      this.editTransactionData = {};
      this.blurDashboard = true;
    },
    handleBlurToggle(value) {
      if (value && !this.editTransactionData) {
        this.editTransactionData = null;
      }
      this.blurDashboard = value;
    }
  }
};
</script>

<style scoped>
.dashboard {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 0;
  padding: 20px 10px 70px 10px;
  box-sizing: border-box;
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

@media (max-width: 600px) {
  .card-spacing {
    margin: 0 7px 20px 7px;
  }

  .dashboard-header {
    display: none;
  }

  .user-icon {
    padding-bottom: 20px;
    height: 65px;
  }

  .username {
    padding-left: 6px;
    padding-top: 30px;
    font-size: 25px;
  }
}
</style>