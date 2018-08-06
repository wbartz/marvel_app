import md5 from 'js-md5';
import {
  PRIV_KEY,
  PUB_KEY,
  HEROES,
  DEFAULT_URL,
} from '../types';

const hash = md5.create();
const ts = Number(new Date());
hash.update(ts + PRIV_KEY + PUB_KEY);

export function getHeroes(offset = 0) {
  const url = `${DEFAULT_URL}characters?ts=${ts}&apikey=${PUB_KEY}&hash=${hash.hex()}&offset=${offset}`;

  return {
    type: HEROES.REQUEST,
    payload: {
      request: {
        url,
      },
    },
  };
}

export function resetHeroes(startWith = null) {
  let url = `${DEFAULT_URL}characters?ts=${ts}&apikey=${PUB_KEY}&hash=${hash.hex()}`;

  if (startWith) {
    url = `${url}&nameStartsWith=${startWith}`;
  }

  return {
    type: HEROES.RESET,
    payload: {
      request: {
        url,
      },
    },
  };
}
