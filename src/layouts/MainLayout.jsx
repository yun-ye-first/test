import React from "react";
import { Layout, Menu } from "antd";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const items = [
  {
    label: "首页",
    key: "/",
  },
  {
    label: "账单列表",
    key: "/bill-list",
  },
];
const MainLayout = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e.key);
  };
  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>记账管理器</Header>
      <Layout className={styles.wrapper}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/"]}
            style={{ height: "100%" }}
            items={items}
            onClick={handleClick}
          />
        </Sider>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
