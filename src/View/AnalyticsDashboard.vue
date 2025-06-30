<template>
  <div class="main-content">
    <p class="title">Analytics</p>
    <div class="grid">
      <SpendingInsights class="spending-card" />
      <KeyMetrics class="keymatrics-card" />
      <MonthlyExpenses class="monthly-card" />
    </div>
    <DailyExpenses class="daily-card" />
  </div>
</template>

<script>
import SpendingInsights from "@/components/SpendingInsights.vue";
import KeyMetrics from "@/components/KeyMetrics.vue";
import MonthlyExpenses from "@/components/MonthlyExpenses.vue";
import DailyExpenses from "@/components/DailyExpenses.vue";

export default {
  name: 'AnalyticsDash',
  components: { SpendingInsights, KeyMetrics, MonthlyExpenses, DailyExpenses },
}
</script>

<style scoped>
.title {
    color: #78a55a;
    margin-top: 20px;
    margin-left: 10px;
    font-size: 35px;
    font-weight: 500;
  }
  .grid {
    display: flex;
    gap: 20px;
  }

.spending-card {
    background: #0d0d0d;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #6e6d7a;
    width: 20vw;
    height: 23.5vw;
    margin-left: 10px;
  }

  .keymatrics-card {
    background: #0d0d0d;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #6e6d7a;
    border-radius: 12px;
    width: 20vw;
    height: 23.5vw;
  }

  .monthly-card {
    background: #0d0d0d;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #6e6d7a;
    width: 30vw;
    height: auto;
  }

  .daily-card {
    background: #0d0d0d;
    padding: 20px;
    border-radius: 12px;
    width: 79.2vw;
    height: 69vh;
    border: 1px solid #6e6d7a;
    margin: 20px 0 0 10px;
  }
  
  .main-content {
    padding: 20px;
    width: 100%;
    height: 93vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>