
  <!-- <div class="card"> -->
    <!-- <p class="spending">Spending Insights</p> -->
     <!-- <div v-if="insights.length === 0" class="no-data-message"> -->
       <!-- <img src="@/assets/cute-puppy.png" alt="No Data" class="no-data-icon" /> -->
      <!-- <p>No insights available yet.</p>
      <p>Start adding transactions to see spending patterns!</p>
    </div> -->
    <!-- <div
      class="item"
      v-for="(item, index) in insights"
      :key="index"
    >
      <img :src="item.icon" :alt="`${item.category} Icon`" :class="['icon', item.iconClass]" />
      <p class="category" :class="item.categoryClass" :style="item.categoryStyle">{{ item.category }}</p>
      <p class="price" :class="item.priceClass" :style="item.priceStyle">{{ item.amount }}</p>
    </div>
  </div>
</template> -->
 
<!-- <script>
 
import { mapGetters } from 'vuex'
 
export default {
  name: 'SpendingInsights',
  computed: {
    ...mapGetters(['topSpendingCategories']),
 
    insights() {
      return this.topSpendingCategories;
    }
  }
}
</script>
 
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;     /* horizontal centering */
}
 
.spending {
  font-size: 22px;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 20px;
  color: #c1bfd9;
  text-align: center;
}
 
.item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 5px;
}
 
.icon {
  height: 25px;
  width: 25px;
  fill: #c1bfd9;
  color: aliceblue;
  padding-left: 8px;
}
 
.icon-fuel {
  height: 38px;
  width: 38px;
  margin-left: -5px;
  margin-bottom: -5px;
  margin-right: -10px;
}
 
.category {
  padding-left: 25px;
  margin: 0;
  color: #ffffff;
  font-size: 14px;
}
 
.category-rent {
  padding-left: 25px;
}
 
.category-salary {
  padding-left: 25px;
}
 
.price {
  font-size: 24px;
  margin: 0;
  color: #ffffff;
  opacity: 0.7;
}
 
.price-food {
  padding-left: 39px;
}
 
.price-fuel {
  padding-left: 44px;
}
 
.price-rent {
  padding-left: 45px;
}
 
.price-travel,
.price-salary {
  padding-left: 35px;
}
</style> -->

<template>
  <div class="card">
    <p class="spending">Spending Insights</p>
     <!-- <div v-if="insights.length === 0" class="no-data-message"> -->
       <!-- <img src="@/assets/cute-puppy.png" alt="No Data" class="no-data-icon" /> -->
      <!-- <p>No insights available yet.</p>
      <p>Start adding transactions to see spending patterns!</p>
    </div> -->
    <div
      class="item"
      v-for="(item, index) in insights"
      :key="index"
    >
    <div class="spending-items">
      <img :src="item.icon" :alt="`${item.category} Icon`" :class="['icon', item.iconClass]" />
      <p class="category" :class="item.categoryClass" :style="item.categoryStyle">{{ item.category }}</p>
      </div>
        <p class="price" :class="item.priceClass" :style="item.priceStyle">{{ item.amount }}</p>
    </div>
  </div>
</template>
 
<script>
 
import { mapGetters } from 'vuex'
 
export default {
  name: 'SpendingInsights',
  computed: {
    ...mapGetters(['topSpendingCategories']),
 
    insights() {
      return this.topSpendingCategories;
    }
  }
}
</script>
 
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;     /* horizontal centering */
}
 
.spending {
  font-size: 22px;
  font-weight: 400;
  margin-top: 9px;
  margin-bottom: 20px;
  color: #c1bfd9;
  text-align: center;
}
 .spending-items{
  display: flex; 
  align-items: center;
  padding-right: 83px;
  margin-left: 140px;
 }
.item {
  display: flex;
  margin-left: -201px;
  align-items: center;
  width: 100%;
  max-width: 320px; /* Optional: control width of the content */
  margin-bottom: 16px;
}
.icon {
  height: 25px;
  width: 25px;
  margin-right: 8px;
}
 
.icon-fuel {
  height: 38px;
  width: 38px;
  margin-left: -5px;
  margin-bottom: -5px;
  margin-right: -10px;
}
 
.category {
  margin: 0;
  color: #ffffff;
  font-size: 14px;
}

.price {
  font-size: 24px;
  /* padding-left: 79px; */
  /* text-align: right; */
  margin: 0;
  color: #ffffff;
  opacity: 0.7;
}
 
.category-rent {
  padding-left: 25px;
}
 
.category-salary {
  padding-left: 25px;
}
 

 
.price-food {
  padding-left: 39px;
}
 
.price-fuel {
  padding-left: 44px;
}
 
.price-rent {
  padding-left: 45px;
}
 
.price-travel,
.price-salary {
  padding-left: 35px;
}
</style>