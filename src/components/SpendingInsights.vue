<template>
  <div class="card">
    <p class="spending">Top Spendings</p>
    <div class="items-grid">
      <div class="item" v-for="(item, index) in insights" :key="index">
        <div class="spending-items">
          <div class="left-group">
            <img :src="item.icon" :alt="`${item.category} Icon`" :class="['icon', item.iconClass]" />
            <p
              class="category"
              :class="item.categoryClass"
              :style="item.categoryStyle"
            >{{ item.category }}</p>
          </div>
          <p class="price" :class="item.priceClass" :style="item.priceStyle">{{ item.amount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SpendingInsights",
  computed: {
    ...mapGetters(["topSpendingCategories"]),
    insights() {
      return this.topSpendingCategories;
    }
  }
};
</script>

<style scoped>
    .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    .spending {
    font-size: 22px;
    font-weight: 400;
    margin-top: 0px;
    margin-bottom: 20px;
    color: #c1bfd9;
    text-align: center;
    }

    .items-grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    }

    .spending-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 310px;
    }

    .left-group {
    display: flex;
    align-items: center;
    gap: 6px;
    }

    .item {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 320px;
    margin-bottom: 16px;
    }

    .icon {
    height: 25px;
    width: 25px;
    margin-right: 0px;
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
    margin: 0;
    color: #ffffff;
    opacity: 0.7;
    text-align: right;
    width: 70px;
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

    @media (min-width: 601px) and (max-width: 1024px) {
    .spending {
        font-size: 20px;
        font-weight: 400;
        margin-top: 0px;
        margin-bottom: 20px;
        color: #c1bfd9;
        text-align: center;
    }

    .items-grid {
        display: grid;
        grid-template-columns: repeat(2, auto);
        gap: 20px;
        justify-items: center;
    }

    .item {
        max-width: 140px;
        width: 100%;
        margin-bottom: 0px;
        align-items: center;
        width: 100%;
        max-width: 320px;
        margin-right: -50px;
    }

    .spending-items {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: auto;
    }

    .left-group {
        flex-direction: column;
        gap: 4px;
    }

    .icon {
        height: 25px;
        width: 25px;
        margin-right: 0px;
    }

    .price {
        font-size: 18px;
        width: auto;
        padding: 0;
    }

    .category {
        font-size: 12px;
        padding: 0;
    }
    }

    @media (max-width: 600px) {
    .spending {
        font-size: 22px;
        font-weight: 400;
        margin-top: 0px;
        margin-bottom: 20px;
        color: #c1bfd9;
        text-align: center;
    }

    .items-grid {
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: 12px;
        justify-items: center;
    }

    .item {
        max-width: 140px;
        width: 100%;
        margin-bottom: 0px;
        align-items: center;
        width: 100%;
        max-width: 320px;
        margin-right: -65px;
    }

    .spending-items {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: auto;
    }

    .left-group {
        flex-direction: column;
        gap: 4px;
    }

    .icon {
        height: 25px;
        width: 25px;
        margin-right: 0px;
    }

    .price {
        font-size: 18px;
        width: auto;
        padding: 0;
    }

    .category {
        font-size: 12px;
        padding: 0;
    }
    }
</style>
