<template>
  <div class="card">
    <p class="spending">Spending Insights</p>

    <div class="item">
      <img src="@/assets/Food logo.svg" alt="Food Icon" class="icon icon-food" />
      <p class="category">Food</p>
      <p class="price price-food">₹7000</p>
    </div>

    <div class="item">
      <img src="@/assets/petrol.svg" alt="Fuel Icon" class="icon icon-fuel" />
      <p class="category" style="padding-left: 27px;">Fuel</p>
      <p class="price price-fuel">₹1000</p>
    </div>

    <div class="item">
      <img src="@/assets/Rent Icon.svg" alt="Rent Icon" class="icon icon-rent" />
      <p class="category category-rent">Rent</p>
      <p class="price price-rent">₹7500</p>
    </div>

    <div class="item">
      <img src="@/assets/Travel icon.svg" alt="Travel Icon" class="icon icon-travel" />
      <p class="category">Travel</p>
      <p class="price price-travel">₹4000</p>
    </div>

    <div class="item">
      <img src="@/assets/Salary Icon.svg" alt="Salary Icon" class="icon icon-salary" />
      <p class="category category-salary">Salary</p>
      <p class="price price-salary">₹30000</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #0d0d0d;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #6e6d7a;
  width: 240px;
  height: 300px;
  margin-left: 185px;
}

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

.price-travel ,.price-salary {
  padding-left: 35px;
}
</style>
