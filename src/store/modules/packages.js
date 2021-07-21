import { getPackagesApi } from "../../api";

const initialState = {
  total: 0,
  error: null,
  packages: [],
  loadingSearch: false,
  loadingPagination: false,
};

const state = () => ({ ...initialState });

const getters = {
  PACKAGES(state) {
    return state.packages.map((item) => item.package);
  },
  LOADING_SEARCH(state) {
    return state.loadingSearch;
  },
  LOADING_PAGINATION(state) {
    return state.loadingPagination;
  },
  ERROR(state) {
    return state.error;
  },
  TOTAL(state) {
    return state.total;
  },
};

const mutations = {
  SET_PACKAGES(state, payload) {
    state.packages = payload;
  },
  SET_SEARCH_LOADING(state, payload) {
    state.loadingSearch = payload;
  },
  SET_PAGINATION_LOADING(state, payload) {
    state.loadingPagination = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  SET_TOTAL(state, payload) {
    state.total = payload;
  },
  CLEAR(state) {
    Object.keys(state).forEach((key) => {
      state[key] = initialState[key];
    });
  },
};

const actions = {
  async GET_PACKAGES_LIST({ commit }, { isPagination, ...params }) {
    isPagination
      ? commit("SET_PAGINATION_LOADING", true)
      : commit("SET_SEARCH_LOADING", true);

    try {
      const { data } = await getPackagesApi(params);
      const { objects, total } = data;
      commit("SET_TOTAL", total);
      commit("SET_PACKAGES", objects);
    } catch (e) {
      commit("SET_ERROR", "ERROR GET PACKAGES");
    } finally {
      isPagination
        ? commit("SET_PAGINATION_LOADING", false)
        : commit("SET_SEARCH_LOADING", false);
    }
  },

  CLEAR_PACKAGES_LIST({ commit }) {
    commit("CLEAR");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
