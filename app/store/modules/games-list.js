const UPDATE_CONNECTION_SUCCESS = 'UPDATE_CONNECTION_SUCCESS';

export default {
  namespaced: true,
  state: {
    isConnected: false,
  },
  getters: {
    getConnectionStatus(status) {
      return status.isConnected;
    },
  },
  mutations: {
    [UPDATE_CONNECTION_SUCCESS](state, newConnection) {
      state.isConnected = newConnection;
    },
  },
  actions: {
    updateConnectionStatus({ commit }, newConnection) {
      commit(UPDATE_CONNECTION_SUCCESS, newConnection);
    },
  },
};
