<template>
<div class="main-content">
    <p class="title">Analytics</p>
    <div class="grid">
        <SpendingInsights class="spending-card" />
        <KeyMetrics class="keymatrics-card" />
        <MonthlyExpenses class="monthly-card" />
    </div>
    <DailyExpenses class="daily-card" />
</div>
</template>

<script>
import SpendingInsights from "@/components/SpendingInsights.vue";
import KeyMetrics from "@/components/KeyMetrics.vue";
import MonthlyExpenses from "@/components/MonthlyExpenses.vue";
import DailyExpenses from "@/components/DailyExpenses.vue";

export default {
    name: 'AnalyticsDash',
    components: {
        SpendingInsights,
        KeyMetrics,
        MonthlyExpenses,
        DailyExpenses
    },
}
</script>

<style scoped>
.title {
    color: #78a55a;
    margin-top: 20px;
    margin-left: 10px;
    font-size: 35px;
    font-weight: 500;
}

.mobile-header {
    display: none;
}

.grid {
    display: flex;
    gap: 20px;
    width: 101%;
}

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
    width: 43%;
    height: auto;
}

.daily-card {
    background: #0d0d0d;
    padding: 20px;
    border-radius: 12px;
    width: 96.2%;
    height: 69vh;
    border: 1px solid #6e6d7a;
    margin: 20px 0 0 10px;
    margin-bottom: 50px;
}

.main-content {
    padding: 20px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    display: block;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #5a5a5a transparent;
}

.scroll {
    display: block;
    max-height: 220px;
    overflow-y: auto;
    width: 1074px;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #5a5a5a transparent;
}

.scroll::-webkit-scrollbar {
    width: 1px;
}


@media (max-width:600px) {
    .title {
        display: none;
    }

    .dashboard-header {
        display: none;
    }

    .mobile-header {
        display: flex;
        margin-left: 6px;
    }

    .user-icon {
        padding-bottom: 20px;
        height: 65px;
    }

    .username {
        padding-left: 6px;
        padding-top: 30px;
        font-size: 25px;
    }

    .grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 101%;
    }

    .spending-card {
        background: #0d0d0d;
        padding: 10px;
        border-radius: 12px;
        border: 1px solid #6e6d7a;
        width: 85vw;
        height: 45.5vw;
        margin-left: 0px;
    }

    .keymatrics-card {
        background: #0d0d0d;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #6e6d7a;
        border-radius: 12px;
        width: 80vw;
        height: 19vw;
        margin-left: 0px;
    }

    .monthly-card {
        background: #0d0d0d;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #6e6d7a;
        width: 80.5vw;
        margin-left: 10px;
        height: auto;
        margin-left: 0px;
    
    }

    .daily-card {
        background: #0d0d0d;
        padding: 20px;
        border-radius: 12px;
        width: 80.5vw;
        height: 45%;
        border: 1px solid #6e6d7a;
        margin: 20px 0 0 10px;
        margin-bottom: 100px;
        margin-left: 0px;
    }
}

@media (min-width: 601px) and (max-width: 1024px) {
    .title {
        font-size: 30px;
    }

    .main-content {

      max-height: 100%;
    }

    .dashboard-header {
        display: none;
    }

    .mobile-header {
        display: flex;
        margin-left: 6px;
    }

    .user-icon {
        padding-bottom: 20px;
        height: 65px;
    }

    .username {
        padding-left: 6px;
        padding-top: 30px;
        font-size: 25px;
    }

    .grid {
        display: flex;
        flex-direction: row;
        gap: 20px;
        width: 101%;
    }

    .spending-card {
        background: #0d0d0d;
        padding: 10px;
        border-radius: 12px;
        border: 1px solid #6e6d7a;
        width: 25vw;
        height: 33.3vw;
        margin-left: 12px;
    }

    .keymatrics-card {
        background: #0d0d0d;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #6e6d7a;
        border-radius: 12px;
        width: 21vw;
        height: 58vh;
        margin-left: 10px;
    }

    .monthly-card {
        background: #0d0d0d;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #6e6d7a;
        width: 25vw;
        height: 20vh;
        margin-left: 10px;
        height: auto;
    }

    .daily-card {
        background: #0d0d0d;
        padding: 20px;
        border-radius: 12px;
        width: 76.5vw;
        height: 75vh;
        border: 1px solid #6e6d7a;
        margin: 20px 0 0 10px;
        margin-bottom: 70px;
    }

  }

</style>
