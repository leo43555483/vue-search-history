import { INVOKING_KEY } from '../../constants';
import { hasOwnProperty } from './lru';

export default function lfu(array, info, sourceKey, limit) {
  if (!Array.isArray(array)) {
    throw new Error('Expected Array in lru');
  }
  let payload = { ...info };
  const list = [].concat(array);
  const { length } = list;
  let miniInvoking = Number.MAX_SAFE_INTEGER;
  let index = -1;
  let miniIndex = -1;
  let exist = false;
  if (length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const item = list[i];
      if (list[i][sourceKey] === payload[sourceKey]) {
        item[INVOKING_KEY] += 1;
        exist = true;
        index = i;
      } else if (item[INVOKING_KEY] <= miniInvoking) {
        miniInvoking = item[INVOKING_KEY];
        miniIndex = i;
      }
    }
    if (!exist && length >= limit) {
      list.splice(miniIndex, 1);
    }
    if (exist && index > -1) {
      [payload] = list.splice(index, 1);
    }
  }
  if (!hasOwnProperty(payload, INVOKING_KEY)) {
    payload[INVOKING_KEY] = 1;
  }
  list.unshift(payload);
  return list;
}
