<template>
  <div class="card">
    <h3 class="title">Monthly Expenses</h3>
    <div class="chart-container">
      <canvas ref="pieChart" height="200"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  mounted() {
    new Chart(this.$refs.pieChart, {
      type: 'pie',
      data: {
        labels: ['Food', 'Rent', 'Travel', 'Shopping','Fuel'],
        datasets: [{
          data: [5500, 4000, 2000, 2500, 1000],
          backgroundColor: ['#9dfc7f', '#5edb87', '#2aa678', '#15745b','#74C365']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
          align: 'center',
          labels: {
            fontColor: 'white',
            fontSize: 12
          }
        }
      }
    });
  }
};
</script>

<style scoped>


.title {
  font-size: 22px;
  font-weight: 400;
  color: #C1BFD9;
  text-align: center;
  margin-bottom: 25px;
  margin-top: 0px;
}

.chart-container {
  height: 240px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
