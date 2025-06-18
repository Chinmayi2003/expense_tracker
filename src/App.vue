<template>
  <div class="dashboard" style="display: flex;">
    <MySidebar1 />
    <main class="main-content">
      <p class="title">Analytics</p>
      <div class="grid">
        <SpendingInsights class="spending-card"/>
        <KeyMetrics class="keymatrics-card"/>
        <MonthlyExpenses class="monthly-card"/>
      </div>
      <DailyExpenses class="daily-card"/>
    </main>
  </div>
</template>

<script>

import SpendingInsights from './components/SpendingInsights.vue';
import KeyMetrics from './components/KeyMetrics.vue';
import MonthlyExpenses from './components/MonthlyExpenses.vue';
import DailyExpenses from './components/DailyExpenses.vue';
import MySidebar1 from "./components/Sidebar.vue";


export default {
  components: {
    MySidebar1,
    SpendingInsights,
    KeyMetrics,
    MonthlyExpenses,
    DailyExpenses
  }
};
</script>

<style scoped>
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
  border: 1px solid #6E6D7A;
  width: 30vw;
  height: auto;
}

.daily-card {
  background: #0d0d0d;
  padding: 20px;
  border-radius: 12px;
  width: 77.8vw;
  height: 63vh;
  border: 1px solid #6e6d7a;
  margin: 20px 0 0 10px;
}

.dashboard {
  display: flex;
  font-family: 'Roboto', sans-serif;
  background: #141414;
  color: white;
  height: 100vh;
}
.main-content {
  padding: 20px;
  width: 100%;
  height: 93vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.title {
  color: #78A55A;
  margin-top: 20px;
  margin-left: 10px;
  font-size: 35px;
  font-weight: 500;
}
.grid {
  display: flex;
  gap: 20px;
}
</style>
