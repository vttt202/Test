import expect from 'expect';
import { storeData, loadData } from './exercise-1';

describe('Function storeData testing', () => {
  it('return string from an array', () => {
    const array = [
      {
        key1: 'value1',
        key2: 'value2',
      },
      {
        keyA: 'valueA',
      },
    ];
    const expected = 'key1=value1;key2=value2\nkeyA=valueA';
    const text = storeData(array);

    expect(text).toEqual(expected);
  });

  it('throwing error when passing a string', () => {
    const string = 'test case';

    expect(() => storeData(string)).toThrowError();
  });
});

describe('Function loadData testing', () => {
  it('return array from a given string', () => {
    const expected = [
      {
        key3: 'value3',
        key4: 'value4',
      },
      {
        keyA: 'valueA',
      },
    ];
    const text = 'key3=value3;key4=value4\nkeyA=valueA';
    const array = loadData(text);

    expect(array).toEqual(expected);
  });

  it('throwing error when not passing string', () => {
    const text = {};

    expect(() => loadData(text)).toThrowError();
  });
});
