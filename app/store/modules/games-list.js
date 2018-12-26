import {
  UPDATE_CONNECTION_SUCCESS,
} from '../../utils/constants';

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
