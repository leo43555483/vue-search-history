import SearchHistory from './components/SearchHistory.vue';
import HistoryList from './components/HistoryList.vue';

const install = (Vue) => {
  if (install.installed) return;
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  Vue.component(SearchHistory.name, SearchHistory);
  Vue.component(HistoryList.name, HistoryList);
};
export { SearchHistory, HistoryList };
export default { install };
