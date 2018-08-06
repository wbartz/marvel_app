import md5 from 'js-md5';
import {
  PRIV_KEY,
  PUB_KEY,
  HEROES_DETAIL,
  DEFAULT_URL,
} from '../types';

const hash = md5.create();
const ts = Number(new Date());
hash.update(ts + PRIV_KEY + PUB_KEY);

function getHero(hero) {
  const url = `${DEFAULT_URL}characters/${hero}?ts=${ts}&apikey=${PUB_KEY}&hash=${hash.hex()}`;

  return {
    type: HEROES_DETAIL.REQUEST_DETAIL,
    payload: {
      request: {
        url,
      },
    },
  };
}

export default getHero;
