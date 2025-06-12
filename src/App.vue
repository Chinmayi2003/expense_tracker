<template>
  <div class="dashboard">
    <main class="main-content">
      <h1 class="title">Analytics</h1>
      <div class="grid">
        <SpendingInsights />
        <KeyMetrics />
        <MonthlyExpenses />
      </div>
      <DailyExpenses />
    </main>
  </div>
</template>

<script>

import SpendingInsights from './components/SpendingInsights.vue';
import KeyMetrics from './components/KeyMetrics.vue';
import MonthlyExpenses from './components/MonthlyExpenses.vue';
import DailyExpenses from './components/DailyExpenses.vue';


export default {
  components: {

    SpendingInsights,
    KeyMetrics,
    MonthlyExpenses,
    DailyExpenses
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  font-family: 'Roboto', sans-serif;
  background: #141414;
  color: white;
  height: 100%;
}
.main-content {
  padding: 20px;
  width: 100%;
}
.title {
  color: #78A55A;
  margin-left: 185px;
  margin-top: 30px;
}
.grid {
  display: flex;
  gap: 20px;
}
</style>
