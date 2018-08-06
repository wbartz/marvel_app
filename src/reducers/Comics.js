import { COMICS } from '../types';

const initialState = {
  comics: [],
  loading: true,
  error: null,
};

const comicReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMICS.REQUEST:
      return {
        ...state,
        loading: true,
        comics: [],
      };
    case COMICS.REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        comics: action.payload.data.data.results.map(
          item => ({
            id: item.id,
            name: item.title,
            image: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`,
          }),
        ),
      };
    case COMICS.REQUEST_FAIL:
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

export default comicReducer;
