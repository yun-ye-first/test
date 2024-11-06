import { createSlice } from "@reduxjs/toolkit";
// 定义初始状态
const initialState = {
  billList: [
    {
      id: 1,
      title: "吃饭",
      money: 100,
      type: 1,
      category: 1,
      date: "2024-05-01",
    },
    {
      id: 2,
      title: "吃饭5",
      money: -30,
      type: 2,
      category: 2,
      date: "2024-05-01",
    },
    {
      id: 3,
      title: "吃饭3",
      money: 100,
      type: 1,
      category: 5,
      date: "2024-02-01",
    },
    {
      id: 4,
      title: "工资收入",
      money: 5000,
      type: 1,
      category: 1,
      date: "2024-06-15",
    },
    {
      id: 5,
      title: "购买衣服",
      money: -300,
      type: 2,
      category: 2,
      date: "2024-06-16",
    },
    {
      id: 6,
      title: "稿费收入",
      money: 1500,
      type: 1,
      category: 1,
      date: "2024-06-20",
    },
    {
      id: 7,
      title: "外出就餐",
      money: -200,
      type: 2,
      category: 1,
      date: "2024-06-25",
    },
    {
      id: 8,
      title: "房租收入",
      money: 2500,
      type: 1,
      category: 3,
      date: "2024-07-01",
    },
    {
      id: 9,
      title: "购买书籍",
      money: -100,
      type: 2,
      category: 4,
      date: "2024-07-05",
    },
    {
      id: 10,
      title: "兼职收入",
      money: 800,
      type: 1,
      category: 5,
      date: "2024-01-10",
    },
    {
      id: 11,
      title: "交通费用",
      money: -50,
      type: 2,
      category: 3,
      date: "2024-10-15",
    },
    {
      id: 12,
      title: "电影票",
      money: -80,
      type: 2,
      category: 4,
      date: "2024-09-20",
    },
    {
      id: 13,
      title: "奖金收入",
      money: 200,
      type: 1,
      category: 1,
      date: "2024-09-25",
    },
  ],
};

// 创建slice
const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    appendBill: (state, action) => {
      console.log(action.payload);
      state.billList = state.billList.concat(action.payload);
    },
    removeBill: (state, action) => {
      state.billList = state.billList.filter(
        (bill) => bill.id !== action.payload
      );
    },
    // 修改账单
    updateBill: (state, action) => {
      const { id, money, category, type, title } = action.payload;
      const bill = state.billList.find((bill) => bill.id === id);
      if (bill) {
        bill.money = money;
        bill.category = category;
        bill.type = type;
        bill.title = title;
      }
    },
    
  },
});

// 导出actions
export const { appendBill, removeBill, updateBill } =
  billSlice.actions;

// 导出reducer
export default billSlice.reducer;
