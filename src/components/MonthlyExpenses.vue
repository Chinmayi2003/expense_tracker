<template>
  <div class="card">
    <h3 class="title">Monthly Expenses</h3>
    <div class="chart-container">
      <canvas ref="pieChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import { mapGetters } from 'vuex';

export default {
  name: 'MonthlyExpenses',
  computed: {
    ...mapGetters(['monthlyExpenseByCategory'])
  },
  mounted() {
    const labels = this.monthlyExpenseByCategory.map(item => item.category);
    const data = this.monthlyExpenseByCategory.map(item => item.amount);

    new Chart(this.$refs.pieChart, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.generateColors(data.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
          labels: {
            fontColor: 'white',
            fontSize: 12
          }
        }
      }
    });
  },
  methods: {
    generateColors(count) {
      const colors = [
        '#9dfc7f', '#5edb87', '#2aa678', '#15745b', '#74C365',
        '#a1c181', '#619b8a', '#3a6351', '#55828b', '#87c38f'
      ];
      // Repeat colors if needed
      while (colors.length < count) {
        colors.push(...colors);
      }
      return colors.slice(0, count);
    }
  }
};
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertical centering */
  align-items: center;     /* horizontal centering */
}
 
.title {
  font-size: 22px;
  font-weight: 400;
  color: #C1BFD9;
  text-align: center;
  margin-bottom: 25px;
  margin-top: -10px;
}
 
.chart-container {
  height: 240px;
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>