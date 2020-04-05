import { TIMER_DIFFERENT_KEY } from '../../constants';

export function hasOwnProperty(o, key) {
  return Object.prototype.hasOwnProperty.call(o, key);
}
export default function lru(array, info, sourceKey, limit) {
  if (!Array.isArray(array)) {
    throw new Error('Expected Array in lru');
  }
  let payload = { ...info };
  const list = [].concat(array);
  const { length } = list;
  if (length > 0) {
    let exist = false;
    let maxTimeDiff = 0;
    let maxIndex = length - 1;
    let index = -1;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const item = list[i];
      if (item[sourceKey] === payload[sourceKey]) {
        if (item[TIMER_DIFFERENT_KEY] > 0) {
          item[TIMER_DIFFERENT_KEY] -= 1;
        }
        index = i;
        exist = true;
      } else {
        item[TIMER_DIFFERENT_KEY] += 1;
        if (item[TIMER_DIFFERENT_KEY] >= maxTimeDiff) {
          maxTimeDiff = item[TIMER_DIFFERENT_KEY];
          maxIndex = i;
        }
      }
    }
    if (!exist && array.length >= limit) {
      list.splice(maxIndex, 1);
    }
    if (exist && index > -1) {
      [payload] = list.splice(index, 1);
    }
  }
  if (!hasOwnProperty(payload, TIMER_DIFFERENT_KEY)) {
    payload[TIMER_DIFFERENT_KEY] = 0;
  }
  list.unshift(payload);
  return list;
}
