import md5 from 'js-md5';
import { PUB_KEY, PRIV_KEY } from '../environment';

import { HERO } from '../types';

export function getHeroes() {
  // const timestamp = Number(new Date());
  const hash = md5.create();
  hash.update(1 + PRIV_KEY + PUB_KEY)

  return {
    type: HERO.REQUEST,
    payload: {
      request: {
        url: 'events/29/characters?ts=1' + '&apikey=' + PUB_KEY + '&hash=' + hash.hex(),
      }
    }
  };
}