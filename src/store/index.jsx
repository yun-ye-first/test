// import
// 搭建redux toolkit
import { configureStore } from "@reduxjs/toolkit";

// 引入reducer
import billReducer from "./bill";

// 创建store
const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});

export default store;
