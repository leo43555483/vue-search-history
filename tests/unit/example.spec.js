// import { shallowMount } from '@vue/test-utils';
import lru from '@/utils/strategy/lru';
import lfu from '@/utils/strategy/lfu';

describe('lru && lfu', () => {
  it('lru unshift new record', () => {
    let array = [];
    const payload = { data: '4', sourceKey: 'data' };
    const expection = [
      { data: '4', sourceKey: 'data', tDiff: 0 },
    ];
    // eslint-disable-next-line no-plusplus
    array = lru(array, payload, 'data', 4);
    expect(array).toEqual(expection);
  });
  it('lru add new to the top', () => {
    let array = [
      { data: '1', sourceKey: 'data', tDiff: 0 },
      { data: '4', sourceKey: 'data', tDiff: 0 },
    ];
    const payload = { data: '4', sourceKey: 'data' };
    const expection = [
      { data: '4', sourceKey: 'data', tDiff: 0 },
      { data: '1', sourceKey: 'data', tDiff: 1 },
    ];
    // eslint-disable-next-line no-plusplus
    array = lru(array, payload, 'data', 4);
    expect(array).toEqual(expection);
  });
  it('lru over limit', () => {
    let array = [
      { data: '1', sourceKey: 'data', tDiff: 0 },
      { data: '2', sourceKey: 'data', tDiff: 1 },
      { data: '3', sourceKey: 'data', tDiff: 2 },
      { data: '4', sourceKey: 'data', tDiff: 3 },
      { data: '5', sourceKey: 'data', tDiff: 4 },
    ];
    const payload = { data: '6', sourceKey: 'data' };
    const expection = [
      { data: '6', sourceKey: 'data', tDiff: 0 },
      { data: '1', sourceKey: 'data', tDiff: 1 },
      { data: '2', sourceKey: 'data', tDiff: 2 },
      { data: '3', sourceKey: 'data', tDiff: 3 },
      { data: '4', sourceKey: 'data', tDiff: 4 },
    ];
    // eslint-disable-next-line no-plusplus
    array = lru(array, payload, 'data', 4);
    expect(array).toEqual(expection);
  });
  it('lfu replacement', () => {
    let array = [
      { data: '1', sourceKey: 'data', invoke: 1 },
      { data: '2', sourceKey: 'data', invoke: 1 },
      { data: '3', sourceKey: 'data', invoke: 1 },
      { data: '4', sourceKey: 'data', invoke: 1 },
      { data: '5', sourceKey: 'data', invoke: 1 },
    ];
    const payload = { data: '6', sourceKey: 'data' };
    const expection = [
      { data: '6', sourceKey: 'data', invoke: 1 },
      { data: '1', sourceKey: 'data', invoke: 1 },
      { data: '2', sourceKey: 'data', invoke: 1 },
      { data: '3', sourceKey: 'data', invoke: 1 },
      { data: '4', sourceKey: 'data', invoke: 1 },
    ];
    // eslint-disable-next-line no-plusplus
    array = lfu(array, payload, 'data', 4);
    expect(array).toEqual(expection);
  });
  it('lfu invoking', () => {
    let array = [
      { data: '1', sourceKey: 'data', invoke: 1 },
      { data: '2', sourceKey: 'data', invoke: 1 },
    ];
    const payload = { data: '2', sourceKey: 'data' };
    const expection = [
      { data: '2', sourceKey: 'data', invoke: 2 },
      { data: '1', sourceKey: 'data', invoke: 1 },
    ];
    // eslint-disable-next-line no-plusplus
    array = lfu(array, payload, 'data', 4);
    expect(array).toEqual(expection);
  });
});
