<template>
  <div class="transactions">
    <div class="table">
      <div class="container1">
        <h2 class="table_header">Recent Transactions</h2>
        <button class="expense_button">
          <span class="icon">+</span>
          Add expense
        </button>

        <div class="search-container">
          <img :src="require('@/assets/searchbar.svg')" class="search-icon" />
          <input type="text" placeholder="Search" class="search_input" />
        </div>
      </div>

      <table>
        <thead class="table_headers">
          <tr class="header">
            <th style="padding-left: 20px;" >Category</th>
            <th>Mode</th>
            <th>Date</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <div class="Category-icons" :class="transaction.categoryClass">
              <img :src="require(`@/assets/${transaction.icon}`)" :class="transaction.iconClass" />
              <td class="category">{{ transaction.category }}</td>
            </div>

            <td class="category-mode">{{ transaction.mode }}</td>
            <td class="Date">{{ transaction.date }}</td>
            <td class="price" :class="transaction.priceClass">{{ transaction.price }}</td>
            <td class="category">{{ transaction.description }}</td>
            
            <div class="Action-iocn">
              <img 
                v-for="action in actionIcons" 
                :key="action.name"
                :src="require(`@/assets/${action.icon}`)" 
                :class="action.class"
              />
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionsTable1",
  data() {
    return {
      actionIcons: [
        {
          name: 'edit',
          icon: 'Edit icon.svg',
          class: 'edit-icon'
        },
        {
          name: 'delete',
          icon: 'Delete icon.svg',
          class: 'delete-icon'
        }
      ],
      
      transactions: [
        {
          category: 'Food',
          icon: 'Food logo.svg',
          iconClass: 'Category-icon',
          categoryClass: '',
          mode: 'Cash',
          date: '03 Feb 2025 at 10:40AM',
          price: '-₹230',
          priceClass: 'negative',
          description: 'Lunch in office.'
        },
        {
          category: 'Travel',
          icon: 'Travel icon.svg',
          iconClass: 'Travel-Category-icon',
          categoryClass: 'travel-Category-icons',
          mode: 'Online',
          date: '05 May 2025 at 12:40AM',
          price: '-₹40',
          priceClass: 'negative',
          description: 'Tea and coffee'
        },
        {
          category: 'Rent',
          icon: 'Rent Icon.svg',
          iconClass: 'Category-icon',
          categoryClass: '',
          mode: 'Google pay',
          date: '10 Jan 2025 at 1:40AM',
          price: '-₹3000',
          priceClass: 'negative',
          description: 'Rent paid'
        },
        {
          category: 'Salary',
          icon: 'Salary Icon.svg',
          iconClass: 'Category-icon',
          categoryClass: '',
          mode: 'Online',
          date: '03 June 2025 at 9:40AM',
          price: '+₹23000',
          priceClass: 'positive',
          description: 'Salary'
        }
      ]
    }
  }
}
</script>
<style scoped>
.transactions {
  background-color: #0d0d0d;
  border-radius: 8px;
  border: 1px solid #3a3a3a;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  height: 56%;
}

.transactions table {
  width: 100%;
  color: white;
  margin-top: 19px;
  border-collapse: collapse;
}

.transactions th {
  background-color: #141414;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 100;
}

.transactions th {
  text-align: left;
  padding-left: 12px;
}

.transactions td {
  padding: 11px;
  text-align: left;
}
.table {
  margin-left: 10px;
  margin-right: 10px;
}

.container1 {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
}
.table_header {
  font-size: 21px;
  margin-left: 3px;
  flex:1px;
  opacity: 0.85;
  margin-top: 10px;
  width: 90%;
}
.expense_button {
  background-color: transparent;
  border: 1px solid #3a3a3a;
  color: #565564;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  cursor: pointer;
  width: 147px;
  height: 50px;
}
.expense_button:hover {
  color:#78A55A;
  opacity: 0.7;
  transform: scale(1);
  box-shadow:
    2px 2px 6px rgba(120, 165, 90, 0.3),    
    2px 2px 6px rgba(120, 165, 90, 0.3),
    2px -2px 6px rgba(120, 165, 90, 0.3),
    -2px -2px 6px rgba(120, 165, 90, 0.3); 
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border-color: #78A55A;
}

.expense_button:hover .icon {
  opacity: 0.9;
  transform: rotate(90deg);
}
.icon {
  background-color: #78a55a;
  color: black;
  opacity: 0.9;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.search-container {
  position: relative;
  display: inline-block;
  background-color: #1c1c1c;
  border-radius: 20px;
  padding: 10px 10px 10px 40px;
  width: 133px;
  height: 29px;
  margin-left: 18px;
  cursor: pointer;
  border: 1px solid transparent; 
  transition: all 0.3s ease; 
}

.search-container:hover {
  border: 0.9px solid #78A55A;
  box-shadow:
     1px 1px 6px rgba(120, 165, 90, 0.3),  
    -1px 1px 6px rgba(120, 165, 90, 0.3);
  background-color: #242424;
}

.search-container:focus-within {
  border-color: #78A55A;
  width: 230px;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
 width: 22px;
  height: 47px;
  opacity: 0.7;
}
.search_input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
  width: 100%;
  height: 100%;
}

.search_input::placeholder {
  color: #888; 
}
.header {
  background-color: #141414;
  height: 43px;
}
.Category-icons {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 18px;
}
.category {
  font-size: 16px;
  color: #C1BFD9;
}
.Category-icon {
  width: 25.21px;
  height: 22.3px;
}

.Travel-Category-icon {
  width: 30.21px;
  height: 27.3px;
  margin-left: -6px;
      margin-bottom: -1px;
}

#travel-Category-icons {
  margin-left: 13px;
}
.category-mode {
  margin-left: 20px;
  color: #C1BFD9;
}
.Date {
  font-size: 16px;
  color: #6E6D7A;
  margin-left: 10px;
}
.price.positive {
  color: #78A55A;
}

.price.negative {
  color: #B22222;
}
.Action-iocn {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 18px;

}
.dashboard {
  margin-top: 10px;
  padding: 16px;
  flex: 1;
}
.edit-icon,
.delete-icon {
  width: 25.21px;
  height: 22.3px;
  cursor: pointer;
}

.edit-icon,
.delete-icon:hover {
  fill: #78a55a;
}

.edit-icon {
  margin-left: -5px;
  margin-right: 5px;
}
.edit-icon:hover,
.delete-icon:hover{
   filter: invert(40%) sepia(40%) saturate(600%) hue-rotate(60deg) brightness(90%) contrast(85%);
}
</style>