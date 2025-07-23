<template>
  <div>
    <div class="transactions">
      <div class="table">
        <div class="container1">
          <h2 class="table_header">Recent Transactions</h2>
          <button class="expense_button" @click="addExpenseHandler">
            <span class="icon">+</span>
            <span class="desktop-text">Add Transaction</span>
            <span class="mobile-text">Add</span>
          </button>

          <div class="mobile-search-container">
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
        </div>

        <table class="transaction-list">
          <thead class="table_headers">
            <tr class="header">
              <th class="category-header">Category</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody class="scroll" v-if="filteredTransactions.length > 0">
            <tr v-for="(transaction, index) in filteredTransactions" :key="index">
              <td class="category-list" @click="showDescription(transaction.description)">
                <div class="category-icons" :class="transaction.categoryClass">
                  <img
                    v-if="transaction.icon"
                    :src="require(`@/assets/${transaction.icon}`)"
                    class="category-icon"
                  />
                  <div
                    class="category-details"
                    @click="handleMobileCategoryEdit(transaction, index)"
                  >
                    <span class="category-text">{{ transaction.category }}</span>
                    <div class="category-subtext">
                      <span class="category-mode-subtext">{{ transaction.mode }}</span>
                      <span class="sepration-dot">.</span>
                      <span class="Date-subtext">{{ formatDate(transaction.date) }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <td class="category-mode">{{ transaction.mode }}</td>
              <td class="Date">{{ (transaction.date) }}</td>
              <td class="mobile-price" :class="transaction.priceClass">
                {{ transaction.price > 0 ? "+" : "-" }}₹{{
                Math.abs(transaction.price)
                }}
              </td>
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
          <button class="yes-btn" @click="deleteTransactionConfirmed">Yes</button>
        </div>
      </div>
    </div>

    <Toast :visible="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Toast from "@/components/Toast.vue";

export default {
  name: "TransactionsTable1",
  components: {
    Toast
  },
  computed: {
    ...mapGetters(["getTransactions"]),
    filteredTransactions() {
      const search = this.searchText?.toLowerCase() || "";
      return this.getTransactions
        .filter(transaction => {
          const category = transaction.category?.toLowerCase() || "";
          const description = transaction.description?.toLowerCase() || "";
          const mode = transaction.mode?.toLowerCase() || "";
          return (
            category.includes(search) ||
            description.includes(search) ||
            mode.includes(search)
          );
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  data() {
    return {
      searchText: "",
      showToast: false,
      toastMessage: "",
      showDeletePopup: false,
      transactionToDelete: null,
      showMobileDescription: false,
      selectedDescription: "",
      deleteIndex: null,
      actionIcons: [
        {
          name: "edit",
          icon: "editicon.svg",
          class: "edit-icon"
        },
        {
          name: "delete",
          icon: "deleteicon.svg",
          class: "delete-icon"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["deleteTransaction"]),
    addExpenseHandler() {
      this.$emit("toggle-blur", true);
    },
    handleAction(name, transaction, index) {
      if (name === "delete") {
        this.confirmDelete(index);
      } else if (name === "edit") {
        this.$emit("edit-transaction", { ...transaction, index });
        this.$emit("toggle-blur", true);
      }
    },
    confirmDelete(index) {
      this.showDeletePopup = true;
      this.deleteIndex = index;
      this.transactionToDelete = this.filteredTransactions[index];
    },
    async deleteTransactionConfirmed() {
      await this.deleteTransaction(this.transactionToDelete);
      this.showDeletePopup = false;
      this.transactionToDelete = null;
      this.deleteIndex = null;
      this.showSuccessToast();
    },
    formatDate(date) {
      const d = new Date(date);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return d.toLocaleDateString("en-GB", options).replace(/ /g, " ");
    },
    cancelDelete() {
      this.showDeletePopup = false;
      this.deleteIndex = null;
    },
    showSuccessToast(message = "Transaction deleted successfully") {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
        this.toastMessage = "";
      }, 2000);
    },
    handleMobileCategoryEdit(transaction, index) {
      if (window.innerWidth <= 600) {
        this.$emit("edit-transaction", { ...transaction, index });
        this.$emit("request-blur");
      }
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

  .desktop-text {
    display: inline;
  }

  .mobile-text {
    display: none;
  }
  .category-header {
    padding-left: 20px !important;
  }
  .category-icons {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 5px;
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

  .category-subtext {
    display: none;
  }

  .mobile-only {
    display: none !important;
  }

  @media (max-width: 600px) {
    .container1 {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    .transactions {
      padding: 17px 0px 17px 9px;
      margin: 0 7px;
      height: 50.5vh;
    }

    .scroll {
      max-height: 280px;
    }

    .table_header {
      font-size: 19px;
      flex: none;
      padding-right: 20px;
    }

    .mobile-search-container {
      flex-direction: row;
      padding-top: 15px;
      padding-right: 20px;
      align-items: center;
    }

    .search-container {
      margin-left: 0px;
      width: 91%;
    }

    .search-container:focus-within {
      width: 91%;
    }

    .expense_button {
      font-size: 15px;
      width: 95px;
      height: 41px;
      border-radius: 12px;
      flex-shrink: 0;
      margin-top: -48px;
      margin-left: 235px;
    }

    .icon {
      width: 18px;
      height: 18px;
      display: flex;
    }

    .category-list {
      width: 18%;
    }

    .desktop-text {
      display: none;
    }

    .mobile-text {
      display: inline;
    }

    .transactions td {
      padding-left: 0 !important;
      padding-right: 0 !important;
      padding-top: 13px;
    }

    .transactions th {
      display: none;
    }

    .transactions thead {
      display: none;
    }

    .mobile-price {
      padding-top: 15px !important;
      width: 7%;
    }

    .action-icon {
      padding-right: 80%;
      padding-top: 18px;
    }

    #description-text-alignment {
      display: none;
    }

    .category-mode {
      display: none;
    }

    .Date {
      display: none;
    }

    .category-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }

    .category-details {
      display: flex;
      flex-direction: column;
    }

    .category-icons {
      height: auto;
    }

    .category-subtext {
      display: flex !important;
      flex-direction: row;
      gap: 5px;
      font-size: 12px;
      color: #b0b0b0;
      margin-top: 2px;
    }

    .sepration-dot {
      width: 0px;
    }

    .category-icon {
      width: 29px;
      height: 29px;
      object-fit: contain;
    }

    .mobile-only {
      display: flex !important;
    }
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    .container1 {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: nowrap;
      margin-bottom: 10px;
    }

    .table_header {
      font-size: 22px;
      flex-shrink: 0;
      /* prevent shrinking */
      white-space: nowrap;
    }

    .expense_button {
      font-size: 16px;
      width: auto;
      padding: 14px 16px;
      height: auto;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .mobile-search-container {
      display: flex;
      justify-content: flex-end;
    }

    .search-container {
      width: 100%;
      max-width: 170px;
      margin-left: 0;
    }

    .transactions {
      padding: 20px 15px;
      margin: 0 15px;
      height: 55.5vh;
    }

    .scroll {
      max-height: 400px;
      overflow-x: auto;
    }

    .desktop-text {
      display: inline;
    }

    .transactions thead {
      display: table-header-group !important;
    }

    .transactions tbody tr {
      width: 745px;
      gap: 30px;
    }

    .category-list {
      width: 11.2%;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .category-mode {
      width: 8%;
      padding-left: 20px !important;
      display: table-cell !important;
    }

    .Date {
      width: 9%;
      text-align: left;
      padding-left: 28px !important;
      padding-right: 0px !important;
    }

    .mobile-price {
      width: 8%;
      text-align: right;
      padding-left: 47px !important;
    }

    #description-text-alignment {
      width: 8%;
      padding-left: 40px;
      padding-right: 20px;
    }

    .action-icon {
      width: 9%;
      text-align: center;
      display: table-cell !important;
      padding-top: 10px;
      padding-left: 0px !important;
    }

    .header th {
      padding: 10px 25px;
      font-size: 14px;
    }

    .category-icons {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .category-icon {
      width: 28px;
      height: 28px;
    }

    .scroll {
      max-height: 260px;
    }
  }
</style>