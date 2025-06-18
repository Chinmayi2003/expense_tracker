<template>
  <div class="card">
    <p class="key-metrics">Key Finance Metrics</p>
    <div class="food">
      <p class="heading">Emergency Fund</p>
      <p class="value">₹30000</p>
    </div>
    <div class="food">
      <p class="save">Savings Rate</p>
      <p class="save-price">20%</p>
    </div>
    <div class="food">
      <p class="run">Runway</p>
      <p class="run-price">2.4</p>
    </div>
  </div>
</template>

<style scoped>


.key-metrics {
  font-size: 22px;
  padding-left: 19px;
  margin-top: 0px;
  font-weight: 400;
  color: #c1bfd9;
}

.food {
  background: #0d0d0d;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #6e6d7a;
  border-radius: 12px;
  width: 190px;
  height: 30px;
  margin-bottom: 15px;
  margin-left: 4px;
}

.heading {
  margin: 0;
  padding-left: 40px;
  margin-top: -8px;
  font-size: 15px;
  color: #ffffff;
  opacity: 70%;
}

.save {
  margin: 0;
  padding-left: 53px;
  margin-top: -8px;
  font-size: 15px;
  color: #ffffff;
  opacity: 70%;
}

.run {
  margin: 0;
  padding-left: 67px;
  margin-top: -8px;
  font-size: 15px;
  color: #ffffff;
  opacity: 70%;
}

.value {
  padding-left: 54px;
  font-size: 24px;
  margin-top: 5px;
  color: #ffffff;
  opacity: 70%;
}

.save-price,
.run-price {
  padding-left: 74px;
  font-size: 24px;
  margin-top: 5px;
  color: #ffffff;
  opacity: 70%;
}
</style>
