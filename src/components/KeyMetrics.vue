<template>
  <div class="card">
    <p class="key-metrics">Key Finance Metrics</p>
 
    <div
      class="mini-card"
      v-for="(metric, index) in metrics"
      :key="index"
    >
      <p class="label">{{ metric.label }}</p>
      <p class="value">{{ metric.value }}</p>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'KeyMetrics',
  computed: {
    ...mapGetters(['incomeTotal', 'expenseTotal', 'moneySaved']),

    metrics() {
      const income = this.incomeTotal || 0;
      const expense = this.expenseTotal || 0;
      const savings = this.moneySaved || 0;

      return [
        { label: 'Emergency Fund', value: `₹${savings}` },
        { 
          label: 'Savings Rate', 
          value: income === 0 ? '0%' : `${((savings / income) * 100).toFixed(2)}%` 
        },
        { 
          label: 'Runway', 
          value: expense === 0 ? '∞' : (savings / expense).toFixed(2) 
        }
      ];
    }
  }
}
</script>

 
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
 
.key-metrics {
  font-size: 22px;
  font-weight: 400;
  color: #c1bfd9;
  margin-top: 5px;
  margin-bottom: 20px;
  text-align: center;
}
 
.mini-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  background: #0d0d0d;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #6e6d7a;
  width: 190px;
  height: 30px;
  margin-top: 0px;
  margin-bottom: 15px;
}
 
.label {
  font-size: 15px;
  color: #ffffff;
  opacity: 0.7;
  margin: 0;
}
 
.value {
  font-size: 24px;
  color: #ffffff;
  opacity: 0.7;
  margin: 5px 0 0 0;
}
</style>