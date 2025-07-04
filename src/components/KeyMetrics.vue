<template>
  <div class="card">
    <p class="key-metrics">Key Finance Metrics</p>

    <div
      class="mini-card"
      v-for="(metric, index) in metrics"
      :key="index"
    >
      <p class="label">
        {{ metric.label }}
        <span class="info-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#aaa" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="none" />
            <text x="12" y="16" text-anchor="middle" font-size="12" fill="white">i</text>
          </svg>
          <span class="tooltip">
            {{ metric.tooltip }}
          </span>
        </span>
      </p>
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
      const income = Math.max(this.incomeTotal || 0, 0);
      const expense = Math.max(this.expenseTotal || 0, 0);
      const savings = Math.max(this.moneySaved || 0, 0);

      return [
        {
          label: 'Emergency Fund',
          value: `₹${savings}`,
          tooltip: 'Total savings accumulated from previous months plus the current balance.' 
        },
        {
          label: 'Savings Rate',
          value: income === 0 ? '0%' : `${Math.max((savings / income) * 100, 0).toFixed(2)}%`,
          tooltip: 'The portion of your income remaining after covering all expenses.' 
        },
        {
          label: 'Runway',
          value: expense === 0 ? '∞' : Math.max((savings / expense), 0).toFixed(2),
          tooltip: 'The number of months you can sustain without income using your emergency fund, based on past expenses.' 
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
}

.value {
  font-size: 24px;
  color: #ffffff;
  opacity: 0.7;
  margin: 5px 0 0 0;
}

.info-icon {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip {
  visibility: hidden;
  width: 180px;
  background-color: #333;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  line-height: 1.4;
  white-space: normal;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

.info-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
