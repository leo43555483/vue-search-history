<template>
  <div class="vs-history__wrap">
    <slot :data="histories.data"></slot>
  </div>
</template>

<script>
import {
  storage,
  isNull,
  stringify,
  getStrategy,
  getId,
} from '../utils';
import { DEFAULT_REPLACE_TYPE, SOURCE_KEY } from '../constants';

const MAX_CACHE_DEFAULT = 5;
export default {
  name: 'SearchHistory',
  data() {
    return {
      histories: {
        data: [],
        hestoryList: null,
      },
      hestoryList: null,
    };
  },
  provide() {
    return {
      historyWrapper: this,
    };
  },
  watch: {
    histories(newVal, oldVal) {
      if (newVal && oldVal) {
        if (newVal.data !== oldVal.data || this.hasUnsaved(newVal)) {
          this.resolve(this.flushCahce, () => {
            if (this.hestoryList) this.hestoryList.setList(newVal.data);
          });
        }
      }
    },
  },
  props: {
    storageInvalid: {
      type: Function,
      default: () => {},
    },
    replacement: {
      type: String,
      default: DEFAULT_REPLACE_TYPE,
    },
    before: {
      type: Function,
      default: null,
    },
    max: {
      type: Number,
      default: MAX_CACHE_DEFAULT,
    },
  },
  methods: {
    add(payload) {
      if (isNull(payload) || payload === '') return;
      let text = payload;
      if (typeof text !== 'string') {
        text = stringify(payload);
      }
      const history = this.generateItem(text);
      this.beforeSave(history);
    },
    removeAll() {
      this.histories = { ...this.histories, data: [] };
    },
    isRepeat(text) {
      return this.histories.data.some((item) => item.data === text);
    },
    beforeSave(info) {
      const { histories, max, before } = this;
      let list = this.strategy(histories.data, info, SOURCE_KEY, max);
      if (before && typeof before === 'function') {
        const data = [].concat(histories.data);
        list = this.before(data, info);
      }
      this.histories = { ...histories, [SOURCE_KEY]: list };
    },
    resolve(fn, cb) {
      return Promise.resolve(cb).then(fn);
    },
    flushCahce(cb) {
      // eslint-disable-next-line no-param-reassign
      this.histories.data.forEach((item) => { item.saved = true; });
      storage.saveToStorage(this.histories);
      if (cb && typeof cb === 'function') cb();
    },
    hasUnsaved(payload) {
      return payload.data.some((item) => !item.saved);
    },
    generateItem(data) {
      const id = getId();
      return {
        id,
        [SOURCE_KEY]: data,
        sourceKey: SOURCE_KEY,
        saved: false,
      };
    },
    handleBeforeUnload() {
      const { histories } = this;
      if (this.hasUnsaved(histories)) this.flushCahce();
    },
    beforeUnload() {
      window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
  },
  created() {
    const { replacement } = this;
    const initialHistories = {
      replacement,
      data: [],
    };
    this.beforeUnload();
    storage.init(initialHistories)
      .then((histories) => {
        this.histories = histories;
        this.strategy = getStrategy(replacement);
      }).catch((e) => {
        this.storageInvalid(e);
      });
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
};
</script>

<style>

</style>
