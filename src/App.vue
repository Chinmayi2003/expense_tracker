<template>
  <!-- <LoginForm /> -->
  <div class="analytics" style="display: flex">
    <MySidebar1 />
    <!-- <AddExpense /> -->
    <div class="dashboard">
      <h1 class="dashboard-header">Dashboard</h1>
      <SummaryCards1 class="card-spacing" />
      <TransactionsTable1 />
    </div>
    <!-- <main class="main-content">
      <p class="title">Analytics</p>
      <div class="grid">
        <SpendingInsights class="spending-card" />
        <KeyMetrics class="keymatrics-card" />
        <MonthlyExpenses class="monthly-card" />
      </div>
      <DailyExpenses class="daily-card" />
    </main>  -->

    <!-- <div class="settings">
        <SettingsPage/>
      </div> -->
  </div>
</template>

<script>
import MySidebar1 from "./components/Sidebar.vue";
// import SpendingInsights from "./components/SpendingInsights.vue";
// import KeyMetrics from "./components/KeyMetrics.vue";
// import MonthlyExpenses from "./components/MonthlyExpenses.vue";
// import DailyExpenses from "./components/DailyExpenses.vue";
// import AddExpense from "./components/Add-expense.vue";
// import SettingsPage from './components/UserSettings.vue'
import SummaryCards1 from "./components/SummaryCards.vue";
import TransactionsTable1 from "./components/TransactionTable.vue";
// import LoginForm from "./components/Login.vue"

export default {
  name: "App",
  components:
    // { LoginForm }
    // { MySidebar1, SettingsPage },
    // { MySidebar1, SpendingInsights, KeyMetrics, MonthlyExpenses, DailyExpenses},
    { MySidebar1, SummaryCards1, TransactionsTable1 },
  // {MySidebar1, AddExpense}
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
    border: 1px solid #6e6d7a;
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

  .analytics {
    display: flex;
    font-family: "Roboto", sans-serif;
    background: #141414;
    color: white;
    height: 100vh;
    overflow-y: hidden;
  }
  .main-content {
    padding: 20px;
    width: 100%;
    height: 93vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

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
</style>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

  body {
    margin: 0;
    background-color: #0e0f10;
    color: white;
    font-family: "Roboto", sans-serif;
  }

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
  <style>
  body {
    background-color: #141414;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .settings {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 90%;
  }
</style>
