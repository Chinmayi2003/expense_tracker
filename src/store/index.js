// import Vue from 'vue'
// import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// import { db } from '@/firebase'
// import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

// Vue.use(Vuex)


// export default new Vuex.Store({
//   state: {
//     transactions: [],
//     userId: null
//   },
//   mutations: {
//     SET_TRANSACTIONS(state, transactions) {
//       state.transactions = transactions
//     },
//     ADD_TRANSACTION(state, transaction) {
//       state.transactions.push(transaction)
//     },
//     DELETE_TRANSACTION(state, index) {
//       state.transactions.splice(index, 1)
//     },
//     SET_USER_ID(state, uid) {
//       state.userId = uid
//     }
//   },
//   actions: {
//     // async fetchTransactions({ commit, state }) {
//     //   if (!state.userId) return

//     //   const userDocRef = doc(db, 'users', state.userId)
//     //   const docSnap = await getDoc(userDocRef)
//     //   if (docSnap.exists()) {
//     //     const data = docSnap.data()
//     //     commit('SET_TRANSACTIONS', data.transactions || [])
//     //   } else {
//     //     commit('SET_TRANSACTIONS', [])
//     //   }
//     // },

//     async addTransaction({ commit, state }, transaction) {
//       if (!state.userId) {
//         console.error("Cannot add transaction: userId is null");
//         return;
//       }

//       commit('ADD_TRANSACTION', transaction);

//       const userDocRef = doc(db, 'users', state.userId);
//       await setDoc(userDocRef, {
//         transactions: arrayUnion(transaction)
//       }, { merge: true });
//     },

//     async deleteTransaction({ commit, state }, index) {
//       if (!state.userId) {
//         console.error("Cannot delete transaction: userId is null");
//         return;
//       }

//       const transactionToDelete = state.transactions[index];
//       commit('DELETE_TRANSACTION', index);

//       const userDocRef = doc(db, 'users', state.userId);
//       await updateDoc(userDocRef, {
//         transactions: arrayRemove(transactionToDelete)
//       });
//     },

//     setUser({ commit }, uid) {
//       commit('SET_USER_ID', uid)
//     }
//   },
//   getters: {
//     incomeTotal: state =>
//       state.transactions.filter(t => t.price > 0)
//         .reduce((sum, t) => sum + Number(t.price), 0),

//     expenseTotal: state =>
//       state.transactions.filter(t => t.price < 0)
//         .reduce((sum, t) => sum + Math.abs(t.price), 0),

//     balance: (state, getters) =>
//       getters.incomeTotal - getters.expenseTotal,

//     moneySaved: (state, getters) =>
//       getters.balance
//   },
//   plugins: [createPersistedState()]
// })

//working code
// import Vue from 'vue'
// import Vuex from 'vuex'
// import { db } from '@/firebase'
// import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

// Vue.use(Vuex)

// const getDefaultState = () => ({
//   transactions: [],
//   userId: null
// })

// export default new Vuex.Store({
//   state: getDefaultState(),

//   mutations: {
//     SET_TRANSACTIONS(state, transactions) {
//       state.transactions = transactions
//     },
//     ADD_TRANSACTION(state, transaction) {
//       state.transactions.push(transaction)
//     },
//     DELETE_TRANSACTION(state, index) {
//       state.transactions.splice(index, 1)
//     },
//     SET_USER_ID(state, uid) {
//       state.userId = uid
//     },
//     RESET_STATE(state) {
//       Object.assign(state, getDefaultState())
//     }
//   },

//   actions: {
//     async fetchTransactions({ commit, state }) {
//       if (!state.userId) return

//       const userDocRef = doc(db, 'users', state.userId)
//       const docSnap = await getDoc(userDocRef)
//       if (docSnap.exists()) {
//         const data = docSnap.data()
//         commit('SET_TRANSACTIONS', data.transactions || [])
//       } else {
//         commit('SET_TRANSACTIONS', [])
//       }
//     },

//     async addTransaction({ commit, state }, transaction) {
//       if (!state.userId) {
//         console.error("Cannot add transaction: userId is null")
//         return
//       }

//       commit('ADD_TRANSACTION', transaction)

//       const userDocRef = doc(db, 'users', state.userId)
//       await setDoc(userDocRef, {
//         transactions: arrayUnion(transaction)
//       }, { merge: true })
//     },

//     async deleteTransaction({ commit, state }, index) {
//       if (!state.userId) {
//         console.error("Cannot delete transaction: userId is null")
//         return
//       }

//       const transactionToDelete = state.transactions[index]
//       commit('DELETE_TRANSACTION', index)

//       const userDocRef = doc(db, 'users', state.userId)
//       await updateDoc(userDocRef, {
//         transactions: arrayRemove(transactionToDelete)
//       })
//     },

//     setUser({ commit }, uid) {
//       commit('SET_USER_ID', uid)
//     }
//   },

//   getters: {
//     incomeTotal: state =>
//       state.transactions.filter(t => t.price > 0)
//         .reduce((sum, t) => sum + Number(t.price), 0),

//     expenseTotal: state =>
//       state.transactions.filter(t => t.price < 0)
//         .reduce((sum, t) => sum + Math.abs(t.price), 0),

//     balance: (state, getters) =>
//       getters.incomeTotal - getters.expenseTotal,

//     moneySaved: (state, getters) =>
//       getters.balance
//   }
// })


import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

Vue.use(Vuex)

const getDefaultState = () => ({
  transactions: [],
  userId: null
})

// 🔧 Helper function for spending insights
function getIconForCategory(category) {
  const icons = {
    Food: require('@/assets/Food logo.svg'),
    Rent: require('@/assets/Rent Icon.svg'),
    Travel: require('@/assets/Travel icon.svg'),
    Salary: require('@/assets/Salary Icon.svg'),
  };
  return icons[category] || require('@/assets/default-icon.svg'); // fallback icon
}

export default new Vuex.Store({
  state: getDefaultState(),

  mutations: {
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    },
    ADD_TRANSACTION(state, transaction) {
      state.transactions.push(transaction)
    },
    DELETE_TRANSACTION(state, transactionToDelete) {
      state.transactions = state.transactions.filter(
        t => t !== transactionToDelete
      );
    },
    SET_USER_ID(state, uid) {
      state.userId = uid
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    }
  },

  actions: {
    async fetchTransactions({ commit, state }) {
      if (!state.userId) return

      const userDocRef = doc(db, 'users', state.userId)
      const docSnap = await getDoc(userDocRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        commit('SET_TRANSACTIONS', data.transactions || [])
      } else {
        commit('SET_TRANSACTIONS', [])
      }
    },

    async addTransaction({ commit, state }, transaction) {
      if (!state.userId) {
        console.error("Cannot add transaction: userId is null")
        return
      }

      commit('ADD_TRANSACTION', transaction)

      const userDocRef = doc(db, 'users', state.userId)
      await setDoc(userDocRef, {
        transactions: arrayUnion(transaction)
      }, { merge: true })
    },

    // async deleteTransaction({ commit, state }, index) {
    //   if (!state.userId) {
    //     console.error("Cannot delete transaction: userId is null")
    //     return
    //   }

    //   const transactionToDelete = state.transactions[index]
    //   commit('DELETE_TRANSACTION', index)

    //   const userDocRef = doc(db, 'users', state.userId)
    //   await updateDoc(userDocRef, {
    //     transactions: arrayRemove(transactionToDelete)
    //   })
    // },

    async deleteTransaction({ commit, state }, transactionToDelete) {
      if (!state.userId) {
        console.error("Cannot delete transaction: userId is null");
        return;
      }

      commit('DELETE_TRANSACTION', transactionToDelete);

      const userDocRef = doc(db, 'users', state.userId);
      await updateDoc(userDocRef, {
        transactions: arrayRemove(transactionToDelete)
      });
    },


    setUser({ commit }, uid) {
      commit('SET_USER_ID', uid)
    }
  },

  getters: {
    incomeTotal: state =>
      state.transactions.filter(t => t.price > 0)
        .reduce((sum, t) => sum + Number(t.price), 0),

    expenseTotal: state =>
      state.transactions.filter(t => t.price < 0)
        .reduce((sum, t) => sum + Math.abs(t.price), 0),

    balance: (state, getters) =>
      getters.incomeTotal - getters.expenseTotal,

    moneySaved: (state, getters) =>
      getters.balance,

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

      state.transactions.forEach(transaction => {
        if (transaction.price < 0) { // Only expenses
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

      const sorted = Object.entries(categoryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
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

      state.transactions.forEach(transaction => {
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
        amount
      }));
    },

    dailyExpenseOfMonth: (state) => {
      const now = new Date();
      const currentMonth = now.getMonth(); // 0 = Jan
      const currentYear = now.getFullYear();

      // Initialize 30/31/28 days for the current month
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const dailyTotals = Array(daysInMonth).fill(0); // index 0 = day 1

      state.transactions.forEach(transaction => {
        if (transaction.price < 0) {
          const date = new Date(transaction.date);
          if (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          ) {
            const day = date.getDate(); // 1 to 31
            dailyTotals[day - 1] += Math.abs(Number(transaction.price));
          }
        }
      });

      return dailyTotals;
    }


  }
})
