const billCategory = [
  {
    id: 1,
    name: "餐饮",
  },
  {
    id: 2,
    name: "购物",
  },
  {
    id: 3,
    name: "交通",
  },
  {
    id: 4,
    name: "娱乐",
  },
  {
    id: 5,
    name: "其他",
  },
];
const getBillCategoryName = (id) => {
  const category = billCategory.find((item) => item.id === id);
  return category ? category.name : "";
};

const billType = [
  {
    id: 1,
    name: "收入",
  },
  {
    id: 2,
    name: "支出",
  },
];
const getBillTypeName = (id) => {
  const type = billType.find((item) => item.id === id);
  return type ? type.name : "";
};
const getBillByMoney = (money) => {
  return money > 0 ? 1 : 2; // 1:收入 2:支出
};

export {
  billCategory,
  getBillCategoryName,
  billType,
  getBillTypeName,
  getBillByMoney,
};
