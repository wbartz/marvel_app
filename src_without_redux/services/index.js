import axios from 'axios'
import md5 from 'js-md5'

const private_key = "e484d93cec6f67168d04aa757dc82ca85abca73d"
const public_key = "f1ff16a34164b3261241f806f10a4e69"

const API_URL = 'http://gateway.marvel.com/v1/public/'
const timestamp = Number(new Date())
const hash = md5.create()

const marvelService = (offset, limit = 20) => {
  hash.update(timestamp + private_key + public_key)
  return (
    axios.get(`${API_URL}events/29/characters`, {
      params: {
        'ts': timestamp,
        'limit': limit,
        'apikey': public_key,
        'hash': hash.hex(),
        'offset': offset
      }
    })
  )
}

export default marvelService;


//http://gateway.marvel.com/v1/public/events/29/characters?ts=1531922502951&&apikey: 'f1ff16a34164b3261241f806f10a4e69',
//07-18 11:01:43.043  4148  4841 I ReactNativeJS:      hash: '4da49683a3c2ca852f2a9753467a6a40'