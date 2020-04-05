import storage from './localStorage';
import getStrategy from './strategy';

export function isNull(value) {
  return value === null;
}
export function stringify(value) {
  return JSON.stringify(value);
}
export function getId() {
  const char = 'A'.charCodeAt(0);
  let ret = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 4; i++) {
    const seed = Math.floor(Math.random() * 26);
    const cap = String.fromCharCode(char + seed);
    ret += cap;
  }
  return ret;
}
export function throttle(fn, delay = 16) {
  const pre = 0;
  const timer = null;
  return function (...args) {
    const cur = Date.now();
    const remaining = delay - (cur - pre);
    if (remaining <= 0) {
      fn.apply(this, args);
    } else {
      setTimeout(() => {
        clearTimeout(timer);
        fn.apply(this, args);
      }, remaining);
    }
  };
}
export { storage, getStrategy };
