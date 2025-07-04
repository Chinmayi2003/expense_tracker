<template>
  <div>
    <div class="transactions">
      <div class="table">
        <div class="container1">
          <h2 class="table_header">Recent Transactions</h2>
          <button class="expense_button" @click="addExpenseHandler">
            <span class="icon">+</span>
            Add Transaction
          </button>

          <div class="search-container">
            <img :src="require('@/assets/searchbar.svg')" class="search-icon" />
            <input
              type="text"
              placeholder="Search category"
              class="search_input"
              v-model="searchText"
            />
          </div>
        </div>

        <table>
          <thead class="table_headers">
            <tr class="header">
              <th style="padding-left: 20px">Category</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody class="scroll" v-if="filteredTransactions.length > 0">
            <tr v-for="(transaction, index) in filteredTransactions" :key="index">
              <td>
                <div class="category-icons" :class="transaction.categoryClass">
                  <img
                    v-if="transaction.icon"
                    :src="require(`@/assets/${transaction.icon}`)"
                    class="category-icon"
                  />
                  <span class="category-text">{{ transaction.category }}</span>
                </div>
              </td>

              <td class="category-mode">{{ transaction.mode }}</td>
              <td class="Date">{{ (transaction.date) }}</td>
              <td
                :class="transaction.priceClass"
              >{{ transaction.price > 0 ? "+" : "-" }}₹{{ Math.abs(transaction.price) }}</td>
              <td
                class="category trans-desc"
                id="description-text-alignment"
              >{{ transaction.description }}</td>

              <div class="action-icon">
                <img
                  v-for="action in actionIcons"
                  :key="action.name"
                  :src="require(`@/assets/${action.icon}`)"
                  :class="action.class"
                  @click="handleAction(action.name, transaction, index)"
                />
              </div>
            </tr>
          </tbody>

          <tbody v-else>
            <tr class="no-data-row">
              <td colspan="6" class="no-data-cell">
                <div class="no-data-content">
                  <img src="@/assets/cute-puppy.png" alt="No Data" class="no-data-img" />
                  <span>No data available</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showDeletePopup" class="popup-overlay">
      <div class="popup-box">
        <p class="popup-message">Are you sure you want to delete this transaction?</p>
        <div class="popup-buttons">
          <button class="no-btn" @click="cancelDelete">No</button>
          <button class="yes-btn" @click="deleteTransaction">Yes</button>
        </div>
      </div>
    </div>

    <div v-if="showToast" class="snackbar-notification">
      <span>Transaction deleted successfully</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TransactionsTable1",
  components: {},
  computed: {
    ...mapState(["transactions"]),
    filteredTransactions() {
      const search = this.searchText.toLowerCase();
      return this.transactions
        .filter(transaction =>
          transaction.category.toLowerCase().includes(search)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  data() {
    return {
      searchText: "",
      showToast: false,
      showDeletePopup: false,
      transactionToDelete: null,
      deleteIndex: null,
      actionIcons: [
        {
          name: "edit",
          icon: "Edit icon.svg",
          class: "edit-icon"
        },
        {
          name: "delete",
          icon: "Delete icon.svg",
          class: "delete-icon"
        }
      ]
    };
  },
  methods: {
    addExpenseHandler() {
      this.$emit("request-blur");
    },
    handleAction(name, transaction, index) {
      if (name === "delete") {
        this.confirmDelete(index);
      } else if (name === "edit") {
        this.$emit("edit-transaction", { ...transaction, index });
        this.$emit("request-blur");
      }
    },
    confirmDelete(index) {
      this.showDeletePopup = true;
      this.deleteIndex = index;
      this.transactionToDelete = this.filteredTransactions[index];
    },
    deleteTransaction() {
      this.$store.dispatch("deleteTransaction", this.transactionToDelete);
      this.showDeletePopup = false;
      this.transactionToDelete = null;
      this.deleteIndex = null;

      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
    cancelDelete() {
      this.showDeletePopup = false;
      this.deleteIndex = null;
    }
  }
};
</script>

<style scoped>
  .transactions {
    background-color: #0d0d0d;
    border: 1px solid #3a3a3a;
    border-radius: 8px;
    padding: 21px;
    margin: 0 15px;
    height: 50.5vh;
  }
  .table {
    margin: 0 10px;
  }
  .container1 {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    position: sticky;
  }
  .transactions table {
    width: 100%;
    color: white;
    table-layout: fixed;
    margin-top: 19px;
    border-collapse: collapse;
  }
  .transactions thead,
  .transactions tbody tr {
    width: 1074px;
    display: table;
    table-layout: fixed;
  }
  .transactions th,
  .header {
    overflow-y: auto;
    background-color: #141414;
    text-align: left;
    padding-left: 12px;
    font-size: 16px;
    font-weight: 100;
    height: 43px;
  }

  .transactions td {
    padding: 11px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .table_header {
    font-size: 21px;
    margin-left: 3px;
    flex: 1px;
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
    width: 165px;
    height: 50px;
  }

  .expense_button:hover {
    background-color: #78a55a;
    color: #fff;
    opacity: 0.9;
    transform: scale(1);
    border-color: #78a55a;
    box-shadow: 2px 2px 6px rgba(120, 165, 90, 0.3),
      2px 2px 6px rgba(120, 165, 90, 0.3), 2px -2px 6px rgba(120, 165, 90, 0.3),
      -2px -2px 6px rgba(120, 165, 90, 0.3);
    transition: box-shadow 0.3s ease, transform 0.2s ease;
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

  .expense_button:hover .icon {
    background-color: #fff;
    opacity: 0.9;
    transform: rotate(90deg);
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
    border: 1px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .search-container:hover {
    border: 0.9px solid #78a55a;
    box-shadow: 1px 1px 6px rgba(53, 138, 67, 0.2);
  }

  .search-container:focus-within {
    border: 0.9px solid #78a55a;
    width: 230px;
    box-shadow: 1px 1px 6px rgba(53, 138, 67, 0.2);
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
    font-size: 15px;
    margin-top: -1px;
    width: 100%;
    height: 100%;
  }

  .search_input::placeholder {
    color: #888;
  }
  .category-icons {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 6px;
  }

  .category-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .category-text {
    font-size: 16px;
    color: #c1bfd9;
  }
  .category-mode {
    margin-left: 20px;
    color: #c1bfd9;
  }
  .Date {
    font-size: 16px;
    color: #6e6d7a;
    margin-left: 10px;
  }
  #description-text-alignment {
    padding-left: 15px;
  }
  .positive {
    color: #78a55a;
  }

  .negative {
    color: #b22222;
  }
  .action-icon {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-left: 18px;
    padding-top: 11px;
  }
  .edit-icon,
  .delete-icon {
    width: 25.21px;
    height: 22.3px;
    cursor: pointer;
  }
  .edit-icon {
    margin-left: -5px;
    margin-right: 5px;
  }
  .edit-icon:hover,
  .delete-icon:hover {
    filter: invert(40%) sepia(40%) saturate(600%) hue-rotate(60deg)
      brightness(90%) contrast(85%);
  }

  .snackbar-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: #78a55a;
    border-radius: 6px;
    font-weight: bold;
    color: white;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease;
  }
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(13, 13, 13, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup-box {
    background-color: #1b1919;
    padding: 24px 28px;
    border-radius: 10px;
    border: 1px solid #78a55a;
    width: 291px;
    height: 115px;
    box-shadow: 0 0 12px rgba(120, 165, 90, 0.25);
    color: white;
    position: relative;
  }

  .popup-message {
    font-size: 16px;
    font-weight: 400;
    opacity: 0.9;
    text-align: center;
    margin-bottom: 24px;
  }

  .popup-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-right: 78px;
  }

  .yes-btn,
  .no-btn {
    padding: 8px 18px;
    border-radius: 6px;
    border: 1px solid #aaa;
    background-color: transparent;
    opacity: 0.9;
    width: 60px;
    color: #ffff;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .yes-btn:hover {
    background-color: #78a55a;
    color: #0d0d0d;
    border-color: #78a55a;
  }

  .no-btn:hover {
    background-color: #b22222;
    color: white;
    border-color: #b22222;
  }
  .no-data-cell {
    text-align: center;
    padding: 30px;
  }
  .no-data-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .no-data-img {
    width: 170px;
    margin-bottom: 8px;
  }
  .no-data-cell {
    text-align: center !important;
    color: #888;
    font-size: 16px;
  }
</style>