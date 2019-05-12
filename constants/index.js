const array = [
  {
    key1: 'value1',
    key2: 'value2',
  },
  {
    key1: 'value3',
    key2: 'value4',
  },
  {
    keyA: 'valueA',
    keyB: 'valueB',
  },
];

export default {
  array,
  DISCOUNT_RANGE: 100,
  DISCOUNT_AMOUNT: 5,
  DISCOUNT_BY_USER_TYPE: {
    1: 0.3, // User is an employee of the store
    2: 0.1, // User is an affiliate of the store
    3: 0.05, // User has been a customer for over 2 years
    4: 0,
  },
  CATEGORY_LIST_DISCOUNT: {
    1: 0, // Do not apply discount on groceries
    2: 1,
    3: 1,
    4: 1,
  },
};
