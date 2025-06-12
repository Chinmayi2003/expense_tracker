<template>
  <div class="card full">
    <p class="daily-expenses">Daily Expenses of {{ monthLabel }}</p>
    <canvas ref="barChart" height="100"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      monthLabel: '',
      expenseData: [
        { day: 1, food: 500, rent: 300, travel: 200 },
        { day: 2, food: 800, rent: 400, shopping: 300 },
        { day: 3, food: 1000, rent: 600 },
        { day: 4, rent: 1500, shopping: 1000 },
        { day: 5, food: 1700, shopping: 1000 },
        { day: 6, rent: 1000, travel: 900 },
        { day: 7, food: 1000, rent: 650 },
        { day: 8, shopping: 1000, travel: 800 },
        { day: 9, rent: 1100, food: 1000 },
        { day: 10, food: 1300, shopping: 1000 },
        { day: 11, rent: 800, shopping: 1000 },
        { day: 12, travel: 600, food: 300 },
        { day: 13, food: 350, travel: 400 },
        { day: 14, food: 600, rent: 400 },
        { day: 15, shopping: 1000, food: 400 },
        { day: 16, rent: 1400, travel: 1300 },
        { day: 17, food: 1500, shopping: 1000 },
        { day: 18, food: 700, rent: 500 },
        { day: 19, shopping: 400, travel: 200 },
        { day: 20, food: 500, travel: 400 },
        { day: 21, rent: 400 },
        { day: 22, food: 300 },
        { day: 23, food: 200, travel: 300 },
        { day: 24, shopping: 500, rent: 300 },
        { day: 25, food: 400, travel: 500 },
        { day: 26, rent: 600, food: 400 },
        { day: 27, shopping: 1600, travel: 800 },
        { day: 28, rent: 600, food: 350 },
        { day: 29, food: 400, shopping: 450 },
        { day: 30, food: 700, travel: 300 }
      ]
    };
  },
  mounted() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.monthLabel = monthNames[new Date().getMonth()];

    const totalExpensesPerDay = this.expenseData.map(day =>
      Object.entries(day)
        .filter(([key]) => key !== 'day')
        .reduce((sum, [, value]) => sum + value, 0)
    );

    new Chart(this.$refs.barChart, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => i + 1),
        datasets: [{
          label: '',
          data: totalExpensesPerDay,
          backgroundColor: '#2aa678'
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: (tooltipItem) => {
              const dayIndex = tooltipItem.index;
              const categories = this.expenseData[dayIndex];
              const sortedCategories = Object.entries(categories)
                .filter(([key]) => key !== 'day')
                .sort((a, b) => b[1] - a[1])
                .slice(0, 2)
                .map(([category, value]) => `${category.charAt(0).toUpperCase() + category.slice(1)}: ₹${value}`);
              return sortedCategories;
            }
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
            ticks: { fontColor: 'white' },
            scaleLabel: {
              display: true,
              labelString: 'Money Spent',
              fontColor: 'white',
              fontSize: 14
            }
          }]
        },
        legend: { display: false }
      }
    });
  }
};
</script>

<style scoped>
.daily-expenses {
  font-size: 22px;
  font-weight: 400;
  color: #C1BFD9;
  margin-top: 5px;
  margin-bottom: 20px;
  padding-left: 20px;
}

.card.full {
  background: #0d0d0d;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  width: 1005px;
  height: 380px;
  border: 1px solid #6e6d7a;
  margin-left: 185px;
}
</style>
