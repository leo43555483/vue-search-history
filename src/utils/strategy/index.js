import lru from './lru';
import lfu from './lfu';
import { LRU, LFU } from '../../constants';

export default function getStrategy(type) {
  const strategies = {
    [LRU]: lru,
    [LFU]: lfu,
  };
  return strategies[type];
}
