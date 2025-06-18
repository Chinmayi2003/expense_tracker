
<template>
  <div class="card">
    <p class="spending">Spending Insights</p>

    <div
      class="item"
      v-for="(item, index) in insights"
      :key="index"
    >
      <img :src="item.icon" :alt="`${item.category} Icon`" :class="['icon', item.iconClass]" />
      <p class="category" :class="item.categoryClass" :style="item.categoryStyle">{{ item.category }}</p>
      <p class="price" :class="item.priceClass" :style="item.priceStyle">{{ item.amount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      insights: [
        {
          category: 'Food',
          amount: '₹7000',
          icon: require('@/assets/Food logo.svg'),
          iconClass: 'icon-food',
          categoryClass: '',
          priceClass: 'price-food',
          priceStyle: { paddingLeft: '39px' },
        },
        {
          category: 'Fuel',
          amount: '₹1000',
          icon: require('@/assets/petrol.svg'),
          iconClass: 'icon-fuel',
          categoryClass: '',
          categoryStyle: { paddingLeft: '27px' },
          priceClass: 'price-fuel',
          priceStyle: { paddingLeft: '44px' },
        },
        {
          category: 'Rent',
          amount: '₹7500',
          icon: require('@/assets/Rent Icon.svg'),
          iconClass: 'icon-rent',
          categoryClass: 'category-rent',
          priceClass: 'price-rent',
          priceStyle: { paddingLeft: '45px' },
        },
        {
          category: 'Travel',
          amount: '₹4000',
          icon: require('@/assets/Travel icon.svg'),
          iconClass: 'icon-travel',
          categoryClass: '',
          priceClass: 'price-travel',
          priceStyle: { paddingLeft: '35px' },
        },
        {
          category: 'Salary',
          amount: '₹30000',
          icon: require('@/assets/Salary Icon.svg'),
          iconClass: 'icon-salary',
          categoryClass: 'category-salary',
          priceClass: 'price-salary',
          priceStyle: { paddingLeft: '35px' },
        },
      ],
    };
  },
};
</script>

<style scoped>

.spending {
  padding-left: 25px;
  font-size: 22px;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 20px;
  color: #c1bfd9;
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
  padding-left: 20px;
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
</style>
