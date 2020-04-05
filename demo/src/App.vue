<template>
  <div id="app">
    <input type="text" @change="onChange" @focus="onFocus">
    <button @click="onClick">删除</button>
    <SearchHistory ref="history" replaceType="LFU" :max="10">
      <HistoryList v-show="showHistoryList" @clickItem="onClickItem" :miniShow="5"/>
    </SearchHistory>
  </div>
</template>

<script>
import { SearchHistory, HistoryList } from '../../src';
export default {
  name: 'App',
  data() {
    return {
      showHistoryList: false
    }
  },
  components: {
    SearchHistory,
    HistoryList,
  },
  methods: {
    onClickItem(e, payload) {
      console.log(e);
      console.log('payload cl', payload);
    },
    onClick() {
      this.$refs.history.removeAll();
    },
    onChange(e) {
      const info = {text: e.target.value, id:'1', info:'12312'};
      this.$refs.history.add(info)
    },
    onBlur() {
      this.showHistoryList = false;
    },
    onFocus() {
      this.showHistoryList = true;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
