import Constants from '../constants';

export default class NetPayAmount {
  constructor() {
    this.userType = 0;
    this.bills = {};
    this.discountedBill = {};
  }

  getUser = (userType) => {
    if (Constants.DISCOUNT_BY_USER_TYPE.hasOwnProperty(userType)) {
      this.userType = userType;
    }
    return 'no discount';
  };

  getBills = (bills) => {
    this.bills = bills;
  };

  calculateDiscount = () => {
    for (let bill in this.discountedBill) {
      const invoiceAmount = this.discountedBill[bill].invoiceAmount;
      const amountToApplyDiscount = this.discountedBill[bill].amountToApplyDiscount;
      let discount = 0;

      if (this.userType !== 4) {
        discount += (1 - Constants.DISCOUNT_BY_USER_TYPE[this.userType]) * amountToApplyDiscount;
      } else {
        discount += Math.floor(amountToApplyDiscount / Constants.DISCOUNT_RANGE) * Constants.DISCOUNT_AMOUNT;
      }

      this.discountedBill[bill] = {
        ...this.discountedBill[bill],
        discount,
        netPayable: invoiceAmount - discount,
      };
    }
  };

  getDiscountedBill = () => {
    const discountedCategories = Object.keys(Constants.CATEGORY_LIST_DISCOUNT).filter(
      (categoryId) => Constants.CATEGORY_LIST_DISCOUNT[categoryId] === 1
    );

    for (let key in this.bills) {
      let amountToApplyDiscount = 0;
      let invoiceAmount = 0;
      const purchasedItems = this.bills[key].items;
      const discountedItems = purchasedItems.filter((item) =>
        discountedCategories.includes(item.categoryId.toString())
      );

      purchasedItems.map((item) => {
        invoiceAmount += item.price * item.quantity;
      });

      discountedItems.map((item) => {
        amountToApplyDiscount += item.price * item.quantity;
      });

      this.discountedBill[key] = { invoiceAmount, amountToApplyDiscount };
      this.calculateDiscount();
    }
  };
}
