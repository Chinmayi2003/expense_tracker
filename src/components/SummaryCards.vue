<template>
  <div class="cards">
    <div class="card" v-for="(item, index) in summaryData" :key="index">
      <div class="card-label">{{ item.label }}</div>
      <div class="amount">{{ item.amount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryCards1",
  data() {
    return {
      summaryData: [
        { label: "Balance", amount: "₹1200.37" },
        { label: "Total Spending", amount: "₹5000" },
        { label: "Money Saved", amount: "₹2500" },
        { label: "Income Source", amount: "₹2500" },
      ]
    };
  }
};
</script>

<style scoped>
.cards {
  display: flex;
  gap: 20px;
  flex:wrap;
}

.card {
  flex: 1;
  padding: 20px 37px;
  width:fit-content;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  background-color: #0d0d0d;
  color: #fff;
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
</style>