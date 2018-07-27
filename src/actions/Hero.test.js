import md5 from 'js-md5';
import { getHeroes } from './Hero';
import { HERO } from '../types';
import { PUB_KEY, PRIV_KEY } from '../environment';


describe('Actions', () => {
  const hash = md5.create();
  hash.update(1 + PRIV_KEY + PUB_KEY)

  it('Test a action to get Heroes', () => {
    const expectedAction = {
      type: HERO.REQUEST,
      payload: {
        request: {
          url: 'characters?ts=1' + '&apikey=' + PUB_KEY + '&hash=' + hash.hex(),
        }
      },
    };

    expect(getHeroes()).toEqual(expectedAction);
  });
});