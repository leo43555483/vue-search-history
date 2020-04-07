# vue-search-history
**mobile search-history component on Vue.js 2.0**   

**vue 索引列表组件**
## Installation
```
npm install --save vue-search-history
```

### Basic Usage
```js
import { SearchHistory, HistoryList } from 'vue-search-history';
//or    
import SearchHistory from 'vue-search-history';
Vue.use(SearchHistory);
```

### SearchHistory
| Prop             | Data Type | Required|Default| Description        |
| ---------------- | --------- |-------- |-------|------------------ |
| replacement      | String    | false   | LRU   | Replacement method when the search history exceeds the maximum value.   |
| before        | Function   | false   |    | Method called before saving in localstorage.|
| max   | Number    | false   |  5   | Maximum size of search history list |  
| storageInvalid | Function   | false  | | Callback when localstorage is invalid.|  

| method           |param| Description        |
| ---------------- |------| --------------------- |
| add              |String Object | add record to the localStorage, if use HistoryList please pass {text:'...'}.|
| removeAll        || clear all records.|  

| slot             | Description        |
| ---------------- | --------------------- |
| default          | history list slot.|

### HistoryList
| Prop             | Data Type | Required|Default| Description        |
| ---------------- | --------- |-------- |-------|------------------ |
| miniShow             | Number    | false   |   3   | Display the minimum number of search history.    |
| deleteButton  | Boolean   | false   | true  | Whether to show the delete button.|
| title | String   | false   | 'Search History'  | list title.|
 
### use HistoryList example
```html
<template>
  <div id="app">
    <input type="text" @change="onChange" @focus="onFocus">
    <SearchHistory ref="history" :max="10">
      <HistoryList 
        v-show="showHistoryList" 
        @clickItem="onClickItem" 
        :miniShow="5"
        title="搜索历史"
      />
    </SearchHistory>
  </div>
</template>
```
``` js
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
    onChange(e) {
      const info = {text: e.target.value};
      this.$refs.history.add(info)
    },
    onFocus() {
      this.showHistoryList = true;
    },
  },
}
</script>
```
### custom list 
```html
<template>
  <div id="app">
    <input type="text" @change="onChange" @focus="onFocus">
    <SearchHistory ref="history" replacement="LFU" :max="10">
      <ul slot-scope="{data}">
        <li v-for="(item, i) in data" :key="i">{{item}}</li>
      </ul>
    </SearchHistory>
  </div>
</template>
```
``` js
<script>
export default {
  name: 'App',
  data() {
    return {
      showHistoryList: false
    }
  },
  components: {
    SearchHistory,
  },
  methods: {
    onClickItem(e, payload) {
      console.log(e);
        onsole.log( payload);
    },
    onClick() {
      this.$refs.history.removeAll();
    },
    onChange(e) {
      const info = e.target.value;
      this.$refs.history.add(info)
    },
    onFocus() {
      this.showHistoryList = true;
    },
  },
}
  </script>
```