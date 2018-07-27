import md5 from 'js-md5';
import heroReducer from './Hero';
import thunk from 'redux-thunk';
import { HERO } from '../types';
import { getHeroes } from '../actions';
import { PUB_KEY, PRIV_KEY } from '../environment';

describe('Reducers', () => {
  const hash = md5.create();
  hash.update(1 + PRIV_KEY + PUB_KEY)

  const initialState = {
    heroes: [],
    loading: true,
    error: null,
  };

  const action = {
    type: HERO.REQUEST_SUCCESS,
    payload: {
      request: {
        url: 'characters?ts=1' + '&apikey=' + PUB_KEY + '&hash=' + hash.hex(),
      }
    }
  };

  const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = (action) => thunk(store)(next)(action);

    return { store, next, invoke }
  };

  it('Test a initialState of reducer', () => {
    expect(
      heroReducer(
        undefined,
        {}
      )
    ).toEqual(initialState);
  });

  it('Test a request', () => {
    expect(
      heroReducer(
        initialState,
        getHeroes()
      )
    ).toEqual(initialState);
  });

  it('Test a request success', () => {
    const { next, invoke } = create();
    invoke(action);

    expect(
      next
    ).toHaveBeenCalledWith(action);
  });
});