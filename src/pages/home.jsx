import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Select } from "antd";
import { billCategory } from "../utils/bill-category";

// 注册所有组件
Chart.register(...registerables);
const Home = () => {
  const [category, setCategory] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState([]);

  const bills = useSelector((state) => state.bill.billList);
  useEffect(() => {
    // 计算每月总收入和支出
    setMonthlyTotals(calculateMonthlyTotals(bills));
  }, [category]);

  const calculateMonthlyTotals = (bills) => {
    const monthlyTotals = {};
    bills
      .filter((bill) => {
        if (category === 0) {
          return true;
        } else {
          return bill.category === category;
        }
      })
      .forEach((bill) => {
        const month = moment(bill.date).format("YYYY-MM"); // 格式化为 "YYYY-MM"
        // 初始化每月的收入和支出累加器
        if (!monthlyTotals[month]) {
          monthlyTotals[month] = { income: 0, expense: 0 };
        }
        // 根据账单类型累加金额
        if (bill.type === 1) {
          // 1 代表收入
          monthlyTotals[month].income += bill.money;
        } else if (bill.type === 2) {
          // 2 代表支出
          monthlyTotals[month].expense += Math.abs(bill.money); // 使用绝对值以确保支出为正
        }
      });
    // 获取已排序的月份
    const sortedMonths = Object.keys(monthlyTotals).sort((a, b) =>
      moment(a).diff(moment(b))
    );

    // 创建排序后的结果
    const sortedTotals = {};
    sortedMonths.forEach((month) => {
      sortedTotals[month] = monthlyTotals[month];
    });
    return sortedTotals;
  };

  // 准备柱状图数据结构

  const chartData = {
    labels: Object.keys(monthlyTotals), // 标签（例如，月份）
    datasets: [
      {
        label: "收入",
        data: Object.values(monthlyTotals).map((total) => total.income), // 收入数据
        borderWidth: 1,
      },
      {
        label: "支出",
        data: Object.values(monthlyTotals).map((total) => total.expense), // 支出数据
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleCategoryChange = (value) => {
    console.log(typeof value);

    setCategory(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.statBox}>
        <div className={styles.header}>
          <div>
            <h2>收入支出统计</h2>
          </div>
          <div>
            <Select defaultValue={0} onChange={handleCategoryChange}>
              <Select.Option value={0}>全部</Select.Option>
              {billCategory.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={styles.wrapper}>
          <Bar
            data={chartData}
            options={options}
            width={"100%"}
            height={"40px"}
          />
        </div>
      </div>
      {/* <div style={{ width: "40vw" }}>
        <Bar data={chartData} options={options} />
      </div> */}
    </div>
  );
};
export default Home;
