import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
 
Vue.use(Vuex)
 
const getDefaultState = () => ({
  transactions: [],
  userId: null
})
 
export default new Vuex.Store({
  state: getDefaultState(),
 
  mutations: {
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    },
    ADD_TRANSACTION(state, transaction) {
      state.transactions.push(transaction)
    },
    DELETE_TRANSACTION(state, index) {
      state.transactions.splice(index, 1)
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
 
    async deleteTransaction({ commit, state }, index) {
      if (!state.userId) {
        console.error("Cannot delete transaction: userId is null")
        return
      }
 
      const transactionToDelete = state.transactions[index]
      commit('DELETE_TRANSACTION', index)
 
      const userDocRef = doc(db, 'users', state.userId)
      await updateDoc(userDocRef, {
        transactions: arrayRemove(transactionToDelete)
      })
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
      getters.balance
  }
})