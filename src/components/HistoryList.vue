<template>
  <div class="vs-history__wrapper">
    <div class="vs-history__header" v-if="deleteButton">
      <div class="vs-history__title">搜索历史</div>
      <div
        v-show="list.length > 0"
        @click="onDelete"
        class="vs-history__remove"
        ></div>
    </div>
    <div class="vs-history__main">
      <ul class="vs-history__list">
        <li
          v-for="item in list"
          :key="item.id"
          class="vs-history__item"
          @click="(e) => onClick(e,item)"
          >
          {{item.data | parse}}
          </li>
        <li
          class="vs-arrow"
          :show-all="`${showAll}`"
          v-show="origin.length > miniShow"
          @click="onShowAll"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../assets/css/list.css';

export default {
  name: 'HistoryList',
  data() {
    return {
      list: [],
      origin: [],
      showAll: false,
    };
  },
  watch: {
    showAll(showAll) {
      if (showAll) {
        this.list = this.origin;
      } else {
        this.list = this.sliceList(this.origin);
      }
    },
  },
  props: {
    miniShow: {
      type: Number,
      default: 3,
    },
    deleteButton: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onDelete() {
      this.historyWrapper.removeAll();
    },
    onClick(e, payload) {
      const data = JSON.parse(payload.data);
      this.$emit('clickItem', e, data);
    },
    onShowAll() {
      this.showAll = !this.showAll;
    },
    sliceList(list) {
      return list.slice(0, this.miniShow);
    },
    setList(list) {
      this.origin = list;
      if (this.miniShow > 0) {
        this.list = this.sliceList(list);
      } else {
        this.list = list;
      }
    },
  },
  inject: {
    historyWrapper: {
      default: null,
    },
  },
  filters: {
    parse(string) {
      const info = JSON.parse(string);
      return info.text;
    },
  },
  created() {
    if (this.historyWrapper) {
      this.historyWrapper.hestoryList = this;
    }
  },
};
</script>

<style>

</style>
