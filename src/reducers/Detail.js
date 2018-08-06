import { HEROES_DETAIL } from '../types';

const initialState = {
  hero: [],
  loading: true,
  error: null,
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEROES_DETAIL.REQUEST_DETAIL:
      return {
        ...state,
        loading: true,
        hero: [],
      };
    case HEROES_DETAIL.REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        hero: action.payload.data.data.results.shift(),
      };
    case HEROES_DETAIL.REQUEST_DETAIL_FAIL:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: 'Ocorreu um erro ao processar sua solicitação',
      };
    default:
      return state;
  }
};

export default detailReducer;
