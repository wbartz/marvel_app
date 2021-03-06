import { HERO } from '../types';

const initialState = {
  heroes: [],
  loading: true,
  error: null,
};

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case HERO.REQUEST:
      return {
        ...state,
        loading: true,
      }
    case HERO.REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        heroes: [
          ...state,
          ...action.payload.data.data.results
        ],
      }
    case HERO.REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Não foi possível buscar os dados',
      }
    default:
      return state
  };
};

export default heroReducer;

