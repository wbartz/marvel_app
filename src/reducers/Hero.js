import { HEROES } from '../types';

const initialState = {
  heroes: [],
  loading: true,
  error: null,
};

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEROES.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HEROES.REQUEST_SUCCESS:

      return {
        ...state,
        loading: false,
        heroes: [
          state.heroes,
          ...action.payload.data.data.results.map(
            item => ({
              id: item.id,
              name: item.name,
              image: `${item.thumbnail.path}/landscape_small.${item.thumbnail.extension}`,
            }),
          ),
        ],
      };
    case HEROES.REQUEST_FAIL:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: 'Ocorreu um erro ao processar sua solicitação',
      };
    case HEROES.RESET:
      return {
        ...state,
        loading: true,
      };
    case HEROES.RESET_SUCCESS:
      return {
        ...initialState,
        loading: false,
        heroes: action.payload.data.data.results.map(
          item => ({
            id: item.id,
            name: item.name,
            image: `${item.thumbnail.path}/landscape_small.${item.thumbnail.extension}`,
          }),
        ),
      };
    case HEROES.RESET_FAIL:
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

export default heroReducer;
