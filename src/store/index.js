import Vue from 'vue'
import Vuex from 'vuex'
import {
  init_state,
  getUser,
  getMsgServer,
  setBills,
  setCalls,
  setIsDataLoading,
  checkUserSession,
  login,
  msgServer,
  checkUserSessionAction,
  loginAction,
  emailVerifyAction,
  getUserDataAction,
  logOutAction,
  autoRefresh,
} from './helpers/all'

Vue.use(Vuex)


export const store = new Vuex.Store({
  state: {
    ...init_state
  },
  getters:{
    getUser,
    getMsgServer
  },
  mutations: {
    checkUserSession,
    login,
    msgServer,
    setBills,
    setCalls,
    setIsDataLoading
  },
  actions: {
    //  В этой сеуции приложение могло бы сделать запрос к API. После этого сделать мутацию.
    checkUserSessionAction,
    loginAction,
    getUserDataAction,
    emailVerifyAction,
    autoRefresh,
    logOutAction
  }
})
