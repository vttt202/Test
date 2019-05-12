import Constants from '../constants';

const text = storeData(Constants.array);
const a = loadData(text);

export function storeData(a) {
  if (typeof a !== 'object') {
    throw new Error('Not an array!');
  }
  if (typeof a === 'object' && a.length) {
    return a.map(storeData).join('\n');
  }
  return Object.keys(a).map((key) => `${key}=${a[key]}`).join(';');
}

export function loadData(string) {
  if (typeof string !== 'string') {
    throw new Error('Not a string!');
  }
  const stringArray = string.split('\n');
  const regex = /[\W]+/;
  const newStringArray = stringArray.map((str) => str.split(regex));

  return convertToObject(newStringArray);
}

function convertToObject(arr) {
  let newArray = [];
  arr.map((items, i) => {
    newArray[i] = {};
    items.map((item, j) => {
      if (j % 2 === 0) {
        newArray[i][item] = items[j + 1];
      }
    });
  });
  return newArray;
}
