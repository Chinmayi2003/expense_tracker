import Vue from 'vue'
import Vuex from 'vuex'
import PortalVue from "portal-vue";
import { db } from '@/firebase'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

Vue.use(Vuex)
Vue.use(PortalVue);
const getDefaultState = () => ({
  transactions: [],
  userId: null,
});

function getIconForCategory(category) {
  const icons = {
    Food: require('@/assets/foodlogo.svg'),
    Rent: require('@/assets/renticon.svg'),
    Travel: require('@/assets/travelicon.svg'),
    Salary: require('@/assets/salary.svg'),
    Education: require('@/assets/education.svg'),
    Shopping: require('@/assets/shopping.svg'),
    Health: require('@/assets/health.svg'),
    Entertainment: require('@/assets/entertainment.svg'),
    Utilities: require('@/assets/utilities.svg'),
    Interest: require('@/assets/interest.svg'),
    "Business Income": require('@/assets/businessincome.svg'),
    Freelance: require('@/assets/freelance.svg'),
    Investment: require('@/assets/profit.svg'),
    Taxes: require('@/assets/tax.svg'),
    Insurance: require('@/assets/insurance.svg'),
    Gifts: require('@/assets/gift.svg'),
    Subscriptions: require('@/assets/subscription.svg'),
    Other: require('@/assets/other.svg')
  };
  return icons[category] || require('@/assets/other.svg')
}

export default new Vuex.Store({
  state: getDefaultState(),

  mutations: {
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions;
    },
    ADD_TRANSACTION(state, transaction) {
      state.transactions.unshift(transaction);
    },
    DELETE_TRANSACTION(state, transactionToDelete) {
      state.transactions = state.transactions.filter(
        t => JSON.stringify(t) !== JSON.stringify(transactionToDelete)
      );
    },
    SET_USER_ID(state, uid) {
      state.userId = uid;
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
    UPDATE_TRANSACTION(state, { index, updatedTransaction }) {
      Vue.set(state.transactions, index, updatedTransaction);
    }

  },

  actions: {
    async fetchTransactions({ commit, state }) {
      if (!state.userId) return;

      const userDocRef = doc(db, "users", state.userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        commit("SET_TRANSACTIONS", data.transactions || []);
      } else {
        commit("SET_TRANSACTIONS", []);
      }
    },

    async addTransaction({ commit, state }, transaction) {
      if (!state.userId) {
        console.error("Cannot add transaction: userId is null");
        return;
      }
      const transactionWithId = {
        ...transaction,
        id: Date.now().toString()
      };

      commit('ADD_TRANSACTION', transactionWithId)

      const userDocRef = doc(db, 'users', state.userId)
      await setDoc(userDocRef, {
        transactions: arrayUnion(transactionWithId)
      }, { merge: true })
    },

    async deleteTransaction({ commit, state }, transactionToDelete) {
      if (!state.userId) {
        console.error("Cannot delete transaction: userId is null");
        return;
      }

      commit("DELETE_TRANSACTION", transactionToDelete);

      const userDocRef = doc(db, "users", state.userId);
      await updateDoc(userDocRef, {
        transactions: arrayRemove(transactionToDelete),
      });
    },
    async updateTransaction({ commit, state }, updatedTransaction) {
      if (!state.userId) {
        console.error("Cannot update transaction: userId is null");
        return;
      }

      const index = state.transactions.findIndex(t => t.id === updatedTransaction.id);
      if (index === -1) {
        console.error("Transaction not found for update");
        return;
      }

      commit("UPDATE_TRANSACTION", { index, updatedTransaction });

      const userDocRef = doc(db, "users", state.userId);
      const updatedTransactions = [...state.transactions];
      updatedTransactions.splice(index, 1, updatedTransaction);

      await updateDoc(userDocRef, {
        transactions: updatedTransactions,
      });
    },

    setUser({ commit }, uid) {
      commit("SET_USER_ID", uid);
    },
  },

  getters: {
    getTransactions: state => state.transactions,
    incomeTotal: state =>
      state.transactions.filter(t => t.price > 0)
        .reduce((sum, t) => sum + Number(t.price), 0),

    expenseTotal: (state) =>
      state.transactions
        .filter((t) => t.price < 0)
        .reduce((sum, t) => sum + Math.abs(t.price), 0),

    balance: (state, getters) => getters.incomeTotal - getters.expenseTotal,

    moneySaved: (state, getters) => getters.balance,

    savingsRate: (state, getters) => {
      const income = getters.incomeTotal;
      const savings = getters.moneySaved;
      return income === 0 ? 0 : ((savings / income) * 100).toFixed(2);
    },

    runway: (state, getters) => {
      const expense = getters.expenseTotal;
      const savings = getters.moneySaved;
      return expense === 0 ? Infinity : (savings / expense).toFixed(2);
    },
    topSpendingCategories: (state) => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const categoryMap = {};

      state.transactions.forEach((transaction) => {
        if (transaction.price < 0) {
          const transactionDate = new Date(transaction.date);
          if (
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
          ) {
            const category = transaction.category;
            const amount = Math.abs(Number(transaction.price));

            if (!categoryMap[category]) {
              categoryMap[category] = 0;
            }
            categoryMap[category] += amount;
          }
        }
      });
      console.log(categoryMap, "category map")
      const sorted = Object.entries(categoryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([category, amount]) => ({
          category,
          amount: `₹${amount}`,
          icon: getIconForCategory(category),
        }));

      return sorted;
    },
    monthlyExpenseByCategory: (state) => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const categoryTotals = {};

      state.transactions.forEach((transaction) => {
        if (transaction.price < 0) {
          const transactionDate = new Date(transaction.date);
          if (
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
          ) {
            const category = transaction.category;
            const amount = Math.abs(Number(transaction.price));

            if (!categoryTotals[category]) {
              categoryTotals[category] = 0;
            }
            categoryTotals[category] += amount;
          }
        }
      });

      return Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        amount,
      }));
    },
    dailyExpenseOfMonth: (state) => {
      const now = new Date();
      const last30Dates = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (29 - i));
        return d.toISOString().slice(0, 10);
      });

      const dailyCategoryData = last30Dates.map(() => ({ total: 0 }));

      const dateIndexMap = {};
      last30Dates.forEach((date, idx) => (dateIndexMap[date] = idx));

      state.transactions.forEach((transaction) => {
        if (transaction.price < 0 && transaction.date) {
          const txnDate = new Date(transaction.date).toISOString().slice(0, 10);
          if (txnDate in dateIndexMap) {
            const index = dateIndexMap[txnDate];
            const absPrice = Math.abs(Number(transaction.price));
            const category = transaction.category?.toLowerCase() || "other";

            const dayData = dailyCategoryData[index];
            dayData.total += absPrice;

            if (dayData[category]) {
              dayData[category] += absPrice;
            } else {
              dayData[category] = absPrice;
            }
          }
        }
      });

      return dailyCategoryData;
    },
  },
});
