import {
  LOCAL_KEY,
  INVALID_LOCALSTORAGE,
} from '../constants';

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
          // Firefox
          || e.code === 1014
          // test name field too, because code might not be present
          // everything except Firefox
          || e.name === 'QuotaExceededError'
          // Firefox
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
          // acknowledge QuotaExceededError only if there's something already stored
          && (storage && storage.length !== 0);
  }
}


function init(initialHistories = {}) {
  return new Promise((resolve, reject) => {
    let histories = localStorage.getItem(LOCAL_KEY);
    if (histories === null) {
      histories = initialHistories;
      this.saveToStorage(histories);
    }
    resolve(JSON.parse(histories));
    if (!storageAvailable('localStorage')) {
      reject(new Error(INVALID_LOCALSTORAGE));
    }
  });
}

function saveToStorage(payload) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(payload));
}
const storage = {
  init,
  saveToStorage,
};
export default storage;