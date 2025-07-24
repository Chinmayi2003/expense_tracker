<template>
  <div class="cards">
    <div class="card" v-for="(item, index) in summaryData" :key="index">
      <div class="card-label">{{ item.label }}</div>
      <div class="amount">{{ item.amount }}</div>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
export default {
  name: "SummaryCards1",
  computed: {
    ...mapGetters(["balance", "incomeTotal", "expenseTotal", "moneySaved"]),
    summaryData() {
      const currencySymbol = this.getCurrencySymbolFromLatestTransaction();
      return [
        {
          label: "Balance",
          amount: `${currencySymbol}${this.balance.toFixed(2)}`
        },
        {
          label: "Total Spending",
          amount: `${currencySymbol}${this.expenseTotal.toFixed(2)}`
        },
        {
          label: "Money Saved",
          amount: `${currencySymbol}${this.moneySaved.toFixed(2)}`
        },
        {
          label: "Income Source",
          amount: `${currencySymbol}${this.incomeTotal.toFixed(2)}`
        }
      ];
    }
  },
  methods: {
    getCurrencySymbolFromLatestTransaction() {
      if (!this.$store.state.transactions.length) return "₹";
      const latest = this.$store.state.transactions[
        this.$store.state.transactions.length - 1
      ];
      const currencyMap = {
        Rupee: "₹",
        Dollar: "$",
        Euro: "€"
      };
      return currencyMap[latest.currency] || "₹";
    }
  }
};
</script>
 
<style scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .card {
    flex: 1 1 calc(25% - 15px);
    padding: 20px;
    border: 1px solid #3a3a3a;
    border-radius: 8px;
    background-color: #0d0d0d;
    color: #fff;
    box-sizing: border-box;
  }

  .card-label {
    font-size: 17px;
    font-weight: 100;
    padding: 5px 0 19px;
    opacity: 0.7;
  }

  .amount {
    font-size: 27px;
    font-weight: 500;
    opacity: 0.7;
  }
  @media (max-width: 600px) {
    .card {
      flex: 1 1 calc(50% - 15px);
      padding: 15px;
    }
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    .card-label {
      font-size: 15.8px;
      font-weight: 100;
      padding: 5px 0 19px;
      opacity: 0.7;
    }
    .amount {
      font-size: 24px;
      font-weight: 500;
      opacity: 0.7;
    }
  }
</style>