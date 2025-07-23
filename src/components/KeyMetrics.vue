<template>
<div class="card">
    <p class="key-metrics">
        Key Finance Metrics
        <span class="info-icon" @click="toggleTooltip">
            <svg width="18" height="18" viewBox="0 0 24 19" fill="#aaa" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="none" />
                <text x="12" y="16" text-anchor="middle" font-size="12" fill="white">i</text>
            </svg>
            <span class="tooltip" :class="{ 'visible': isTooltipVisible }">
                <strong>Emergency Fund:</strong> Total savings from previous months plus current balance.
                <br />
                <strong>Savings Rate:</strong> Portion of income remaining after all expenses.
                <br />
                <strong>Runway:</strong> Number of months you can survive without income using your savings.
            </span>
        </span>
    </p>

    <div class="mobile-mini-card">
        <div class="mini-card" v-for="(metric, index) in metrics" :key="index">
            <p class="label">
                {{ metric.label }}
            </p>
            <p class="value">{{ metric.value }}</p>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    name: 'KeyMetrics',
    computed: {
        ...mapGetters(['incomeTotal', 'expenseTotal', 'moneySaved']),

        metrics() {
            const income = Math.max(this.incomeTotal || 0, 0);
            const expense = Math.max(this.expenseTotal || 0, 0);
            const savings = Math.max(this.moneySaved || 0, 0);

            return [{
                    label: 'Emergency Fund',
                    value: `₹${savings}`
                },
                {
                    label: 'Savings Rate',
                    value: income === 0 ? '0%' : `${Math.max((savings / income) * 100, 0).toFixed(2)}%`
                },
                {
                    label: 'Runway',
                    value: expense === 0 ? '∞' : Math.max((savings / expense), 0).toFixed(2)
                }
            ];
        }
    },
    methods: {
    toggleTooltip() {
      this.isTooltipVisible = !this.isTooltipVisible;
    }
  }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.key-metrics {
    font-size: 22px;
    font-weight: 400;
    color: #c1bfd9;
    margin-top: 12px;
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
}

.mini-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(13, 13, 13, 0.7);
    padding: 11px;
    border-radius: 12px;
    border: 1px solid #6e6d7a;
    width: 220px;
    height: auto;
    margin-top: 0px;
    margin-bottom: 15px;
}

.label {
    font-size: 15px;
    color: #ffffff;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.value {
    font-size: 24px;
    color: #ffffff;
    margin: 5px 0 0 0;
}

.info-icon {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.tooltip {
    visibility: hidden;
    width: 350px;
    background-color: #000;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    padding: 10px;
    position: absolute;
    z-index: 9999;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    font-size: 12px;
    line-height: 1.6;
    white-space: normal;
    pointer-events: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
    mix-blend-mode: normal;
}

.tooltip.visible {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}

.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #000 transparent transparent transparent;
}

.info-icon:hover .tooltip {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
}

@media (min-width: 601px) and (max-width: 1024px) {

  .mini-card {
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      padding: 4px;
      width: 170%;
      height: 80%;
      margin-right: 0px;
      margin-left: 30px;
      align-items: center;
  }

  .mobile-mini-card {
      width: 80%;
      display: grid;
      grid-template-columns: repeat(1, 100px);
      gap: 10px;
      margin-left: -90px;
      gap: 15px;
      align-items: center;
      justify-content: space-between;
  }

  .label {
      font-size: 16px;
  }

  .value {
      font-size: 18px;
  }

  .key-metrics {
      font-size: 20px;
      flex-direction: row;
      gap: 4px;
      margin-top: 5px;
  }

  .tooltip {
      width: 45vw;
      font-size: 13px;
      padding: 8px;
  }
}

@media (max-width: 600px) {

  .mini-card {
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      padding: 4px;
      width: 102%;
      margin-right: 3px;
      align-items: center;
  }

  .mobile-mini-card {
      width: 75%;
      display: grid;
      grid-template-columns: repeat(3, 100px);
      margin-left: -98px;
      gap: 17px;
      align-items: center;
      justify-content: space-between;
  }

  .label {
      font-size: 12px;
  }

  .value {
      font-size: 15px;
  }

  .key-metrics {
      font-size: 22px;
      flex-direction: row;
      gap: 4px;
      margin-top: 10px;
  }

  .tooltip {
      width: 45vw;
      font-size: 13px;
      padding: 8px;
  }
}
</style>
