import {
  combineReducers,
} from 'redux';

import heroReducer from './Hero';
import detailReducer from './Detail';
import comicReducer from './Comics';

export default combineReducers({
  heroes: heroReducer,
  hero: detailReducer,
  comics: comicReducer,
});
