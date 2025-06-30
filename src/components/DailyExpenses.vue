<template>
  <div class="card full">
    <p class="daily-expenses">Daily Expenses of {{ monthLabel }}</p>
    <canvas ref="barChart" height="100"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  computed: {
    dailyTotals() {
      return this.$store.getters.dailyExpenseOfMonth;
    },
    monthLabel() {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const now = new Date();
      return monthNames[now.getMonth()];
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const labels = this.dailyTotals.map((_, i) => i + 1);

      new Chart(this.$refs.barChart, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '₹ Spent',
            data: this.dailyTotals,
            backgroundColor: '#2aa678'
          }]
        },
        options: {
          tooltips: {
            callbacks: {
              label: tooltipItem => `₹${tooltipItem.yLabel.toLocaleString('en-IN')}`
            },
            backgroundColor: '#222',
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 13,
          },
          scales: {
            xAxes: [{
              ticks: { fontColor: 'white' },
              scaleLabel: {
                display: true,
                labelString: 'Days',
                fontColor: 'white',
                fontSize: 14
              }
            }],
            yAxes: [{
              ticks: {
                fontColor: 'white',
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Money Spent',
                fontColor: 'white',
                fontSize: 14
              }
            }]
          },
          legend: { display: false },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
};
</script>

<style scoped>
.daily-expenses {
  font-size: 22px;
  font-weight: 400;
  color: #C1BFD9;
  margin: 5px 0 20px 0;
  padding-left: 20px;
}
 .bar-graph-dimensions{
   width: 1024px;
  height: 446px;
 }
</style>
