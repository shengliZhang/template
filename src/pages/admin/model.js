import { isArray, getMsgType, isNumber } from '@/helpers';

export default {
  namespace: 'admin',
  state: {
    currentUser: '',
  },
  effects: {
    *registerUser({ payload }, { call, put }) {},
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
