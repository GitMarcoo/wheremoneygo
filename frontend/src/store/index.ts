import { createStore } from 'vuex'

export default createStore({
  state: {
    incomes: [],
    expenses: []
  },
  getters: {
    getIncomes: state => state.incomes,
    getExpenses: state => state.expenses
  },
  mutations: {
    setIncomes: (state, incomes) => state.incomes = incomes,
    setExpenses: (state, expenses) => state.expenses = expenses
  },
  actions: {
  },
  modules: {
  }
})
