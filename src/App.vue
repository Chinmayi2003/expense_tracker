<!-- <template>
<div style="display: flex;">
<add-expense/>
</div>
</template>
 
<script>
import AddExpense from './Add-expense.vue';


 
export default {
  components: { AddExpense },
  name: "App",
  components: {
    AddExpense
  }
};
</script>
  -->


  <template>
  <div >
    <AddExpense></AddExpense>
  </div>
</template>

<script>
import AddExpense from './components/Add-expense.vue';
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    AddExpense
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>