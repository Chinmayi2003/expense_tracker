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
import {
    mapGetters
} from 'vuex';

export default {
    name: 'MonthlyExpenses',
    computed: {
        ...mapGetters(['monthlyExpenseByCategory'])
    },
    mounted() {
        const labels = this.monthlyExpenseByCategory.map(item => item.category);
        const data = this.monthlyExpenseByCategory.map(item => item.amount);
        const backgroundColors = this.assignColors(labels);

        new Chart(this.$refs.pieChart, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right',
                    labels: {
                        fontColor: 'white',
                        fontSize: 12,
                        boxWidth: 7,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        });
    },
    methods: {
        assignColors(categories) {
            const colorMap = {
                food: '#9dfc7f',
                rent: '#5edb87',
                travel: '#2aa678',
                utilities: '#15745b',
                shopping: '#74C365',
                groceries: '#a1c181',
                entertainment: '#619b8a',
                healthcare: '#3a6351',
                education: '#55828b',
                subscriptions: '#87c38f',
                insurance: '#3a86ff',
                investments: '#8338ec',
                miscellaneous: '#ff006e',
                others: '#fb5607'
            };

            return categories.map(cat =>
                colorMap[cat.toLowerCase()] || '#999'
            );
        }
    }
};
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

@media (min-width: 601px) and (max-width: 1024px) {
    .title {
        font-size: 20px;
        margin-bottom: 15px;
    }

    .chart-container {
        height: 47vh;
        width: 100%;
        max-width: 100%;
        padding: 10px;
    }

    .card {
        padding: 10px 0;
    }
  }

@media screen and (max-width: 600px) {
    .title {
        font-size: 22px;
        margin-bottom: 15px;
    }

    .chart-container {
        height: auto;
        width: 100%;
        max-width: 150%;
        padding: 10px;
    }

    .card {
        padding: 10px 0;
    }
}
</style>
