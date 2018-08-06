import md5 from 'js-md5';
import {
  PRIV_KEY,
  PUB_KEY,
  COMICS,
} from '../types';

const hash = md5.create();
const ts = Number(new Date());
hash.update(ts + PRIV_KEY + PUB_KEY);

function getComics(comic) {
  const url = `${comic}?ts=${ts}&apikey=${PUB_KEY}&hash=${hash.hex()}`;

  return {
    type: COMICS.REQUEST,
    payload: {
      request: {
        url,
      },
    },
  };
}

export default getComics;
