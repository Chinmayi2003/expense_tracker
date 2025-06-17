<template>
  <div class="cards">
    <div class="card"> <div class="card-label">Balance</div><div class="amount"> ₹1200.37 </div></div>
    <div class="card"> <div class="card-label" id="total_spending">Total Spending</div> <div class="amount"> ₹5000 </div></div>
    <div class="card"> <div class="card-label">Money Saved</div> <div class="amount">₹2500 </div> </div>
    <div class="card"> <div class="card-label">Income Source</div> <div class="amount" >₹2500 </div></div>
  </div>
</template>

<script>
export default {
  name: "SummaryCards1"
};
</script>

<style scoped>
.cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  height: 116px;
  margin-right: 15px;
  margin-left: 15px;
}

.card {
  background-color: #0D0D0D;
  padding: 20px;
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  border-radius: 8px;
  padding-left: 37px;
  border: 1px solid #3a3a3a;
  flex: 1;
  width: fit-content;
}

.card-label {
  font-size: 17px;
  margin-bottom: 19px;
  margin-top: 5px;
  font-weight: 100;
  opacity: 0.7;
  color: #FFFFFF;
}
.amount {
  font-size: 27px;
  opacity: 0.7;
  font-weight: 500;
  color: #FFFFFF;
}
#total_spending {
  margin-left: -2px;
}
</style>