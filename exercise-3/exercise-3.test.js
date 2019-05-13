import expect from 'expect';
import NetPayAmount from './exercise-3';

const bills = {
  0: {
    items: [
      {
        id: 1,
        categoryId: 1,
        price: 90,
        quantity: 1,
      },
      {
        id: 104,
        categoryId: 4,
        price: 900,
        quantity: 1,
      },
    ],
  },
};

describe('Show bill with net payable amount', () => {
  it('should discount 30% when user is an employee of the store (userType === 1)', () => {
    const expected = {
      '0': {
        invoiceAmount: 990,
        amountToApplyDiscount: 900,
        discount: 630,
        netPayable: 360,
      },
    };
    const payable = new NetPayAmount();

    payable.getUser(1);
    payable.getBills(bills);
    payable.getDiscountedBill();

    expect(payable.discountedBill).toEqual(expected);
  });

  it('discount 5$ for every $100 spent', () => {
    const expected = {
      '0': {
        invoiceAmount: 990,
        amountToApplyDiscount: 900,
        discount: 45,
        netPayable: 945,
      },
    };
    const payable = new NetPayAmount();

    payable.getUser(4);
    payable.getBills(bills);
    payable.getDiscountedBill();

    expect(payable.discountedBill).toEqual(expected);
  });

  it('should not discount when userType not in promoted list', () => {
    const payable = new NetPayAmount();

    const result = payable.getUser(5);

    expect(result).toEqual('no discount');
  });
});
