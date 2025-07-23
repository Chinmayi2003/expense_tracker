<template>
<div class="card full">
    <p class="daily-expenses">Daily Expenses of Last 30 Days</p>
    <canvas ref="barChart" height="100"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js';

export default {
    computed: {
        dailyCategoryData() {
            return this.$store.getters.dailyExpenseOfMonth;
        }
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        renderChart() {
           const now = new Date();
const labels = Array.from({ length: 31 }, (_, i) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0); // normalize to start of local day
  d.setDate(now.getDate() - (28 - i));
  return `${d.getDate()}/${d.getMonth()+1}`;
});


            const categorySet = new Set();
            this.dailyCategoryData.forEach(day => {
                Object.keys(day).forEach(key => {
                    if (key !== 'total') categorySet.add(key);
                });
            });
            const categories = Array.from(categorySet);

            const colorMap = {
                food: '#9dfc7f',
                rent: '#5edb87',
                travel: '#2aa678',
                utilities: '#15745b',
                shopping: '#74C365',
                entertainment: '#619b8a',
                health: '#3a6351',
                education: '#55828b',
                subscriptions: '#87c38f',
                insurance: '#3a86ff',
                taxes: '#a1c181',
                others: '#fb5607'
            };

            const datasets = categories.map(category => ({
                label: category,
                backgroundColor: colorMap[category.toLowerCase()] || '#999',
                data: this.dailyCategoryData.map(day => day[category] || 0),
                stack: 'daily'
            }));

            new Chart(this.$refs.barChart, {
                type: 'bar',
                data: {
                    labels,
                    datasets
                },
                options: {
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            afterBody: (tooltipItems) => {
                                const dayIndex = tooltipItems[0].index;
                                const total = this.dailyCategoryData[dayIndex].total || 0;
                                return `Total: ₹${total.toLocaleString('en-IN')}`;
                            },
                            label: (tooltipItem, data) => {
                                const value = tooltipItem.yLabel;
                                const label = data.datasets[tooltipItem.datasetIndex].label;
                                return `${this.capitalize(label)}: ₹${value.toLocaleString('en-IN')}`;
                            }
                        },
                        backgroundColor: '#222',
                        titleFontColor: '#fff',
                        bodyFontColor: '#fff',
                        bodyFontSize: 13
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                fontColor: 'white'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date',
                                fontColor: 'white',
                                fontSize: 14
                            }
                        }],
                        yAxes: [{
                            stacked: true,
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
                    legend: {
                        labels: {
                            fontColor: 'white',
                            fontSize: 12,
                            boxWidth: 7,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            generateLabels: (chart) => {
                                const data = chart.data;
                                return data.datasets.map((dataset, i) => ({
                                    text: dataset.label.charAt(0).toUpperCase() + dataset.label.slice(1).toLowerCase(),
                                    fillStyle: dataset.backgroundColor,
                                    pointStyle: 'circle',
                                    datasetIndex: i
                                }));
                            }
                        }
                    },
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

.bar-graph-dimensions {
    width: 1000px;
    height: 446px;
}

@media (min-width: 601px) and (max-width: 1024px) {
  .daily-expenses {
      font-size: 18px;
      padding-left: 12px;
      align-items: center;
  }

  .bar-graph-dimensions {
      width: 500px;
      height: auto;
  }

  canvas {
      width: 100%;
      height: 50%;
  }

  .bar-graph-dimensions {
      width: 100px;
      height: 46px;
  }

  canvas {
      display: block;
      width: 790px !important;
      height: 350px !important;
      margin: auto;
  }

}
@media screen and (max-width: 600px) {
  .daily-expenses {
      font-size: 18px;
      padding-left: 12px;
      align-items: center;
  }

  .bar-graph-dimensions {
      width: 500px;
      height: auto;
  }

  canvas {
      width: 100%;
      height: 50%;
  }

  .bar-graph-dimensions {
      width: 100px;
      height: 46px;
  }

  canvas {
      display: block;
      width: 331px !important;
      height: 350px !important;
      margin: auto;
  }
}
</style>
