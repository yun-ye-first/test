import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Popconfirm, Space, message } from "antd";
import { billCategory, billType } from "../utils/bill-category";
import { useForm } from "antd/es/form/Form";
import FormComponents from "../components/form-components";
import { useSelector, useDispatch } from "react-redux";
import { appendBill, updateBill, removeBill } from "../store/bill";
import moment from "moment";

const BillList = () => {
  const [form] = useForm();
  const [searchForm] = useForm();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [billData, setBillData] = useState([]);

  const dispatch = useDispatch();
  const billList = useSelector((state) => state.bill.billList); // 获取redux中的账单列表
  useEffect(() => {
    setBillData(billList);
  }, [billList]);
  const showModal = () => {
    form.resetFields();
    setCurrentId(null);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const onFinish = () => {
    const { title, money, category } = form.getFieldValue();
    if (!currentId) {
      dispatch(
        appendBill({
          id: new Date().getTime(),
          title,
          money,
          category,
          date: moment(new Date()).format("YYYY-MM-DD"),
          type: money > 0 ? 1 : 2, // 1: 收入，2: 支出
        })
      );
    } else {
      dispatch(
        updateBill({
          id: currentId,
          title,
          money,
          category,
          type: money > 0 ? 1 : 2, // 1: 收入，2: 支出
        })
      );
    }
    form.resetFields();
    hideModal();
  };

  const columns = [
    {
      title: "账单名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "账单金额",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "账单类别",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return billCategory.find((item) => item.id === category)?.name;
      },
    },
    {
      title: "收入/支出",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return billType.find((item) => item.id === type)?.name;
      },
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return moment(date).format("YYYY-MM-DD");
      },
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setCurrentId(record.id);
                form.setFieldsValue({
                  title: record.title,
                  money: record.money,
                  category: record.category,
                });
                setOpen(true);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="删除这条账单"
              description="确认删除这条账单吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                dispatch(removeBill(record.id));
                message.success("删除成功");
              }}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const onSearch = () => {
    const { category, month } = searchForm.getFieldValue();
    console.log(category, month);
    // 根据条件过滤账单列表
    const filteredList = billList.filter((item) => {
      if (category && item.category !== category) {
        return false;
      }

      if (month && Number(moment(item.date).format("MM")) !== month) {
        return false;
      }
      return true;
    });
    setBillData(filteredList);
  };
  return (
    <>
      <div>
        <FormComponents
          Config={{
            RowProps: {
              gutter: [20, 0],
            },
            ColProps: {
              span: 8,
            },
            FormProps: {
              form: searchForm,
              onFinish: onSearch,
            },
            Fields: [
              {
                FormItem: {
                  label: "类别",
                  name: "category",
                },
                component: "Select",
                componentProps: {
                  placeholder: "请选择",
                  options: billCategory,
                  fieldNames: { label: "name", value: "id" },
                  allowClear: true,
                },
              },
              {
                FormItem: {
                  label: "月份",
                  name: "month",
                },
                component: "Select",
                componentProps: {
                  placeholder: "请选择",
                  options: [
                    {
                      id: 1,
                      name: "一月",
                    },
                    {
                      id: 2,
                      name: "二月",
                    },
                    {
                      id: 3,
                      name: "三月",
                    },
                    {
                      id: 4,
                      name: "四月",
                    },
                    {
                      id: 5,
                      name: "五月",
                    },
                    {
                      id: 6,
                      name: "六月",
                    },
                    {
                      id: 7,
                      name: "七月",
                    },
                    {
                      id: 8,
                      name: "八月",
                    },
                    {
                      id: 9,
                      name: "九月",
                    },
                    {
                      id: 10,
                      name: "十月",
                    },
                    {
                      id: 11,
                      name: "十一月",
                    },
                    {
                      id: 12,
                      name: "十二月",
                    },
                  ],
                  fieldNames: { label: "name", value: "id" },
                  allowClear: true,
                },
              },
            ],
            Buttons: [
              {
                type: "primary",
                htmlType: "submit",
                text: "查询",
              },
            ],
            ButtonsColProps: {
              span: 8,
            },
          }}
        />
      </div>
      <div>
        <Button type="primary" onClick={showModal}>
          添加账单
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table
          dataSource={billData}
          columns={columns}
          rowKey={"id"}
          pagination={false}
        />
      </div>
      <Modal
        title={`${currentId ? "编辑" : "添加"}账单`}
        open={open}
        footer={null}
      >
        <FormComponents
          Config={{
            RowProps: {
              gutter: [0, 0],
            },
            ColProps: {
              span: 20,
            },
            FormProps: {
              form,
              onFinish,
            },
            Fields: [
              {
                FormItem: {
                  label: "账单名称",
                  name: "title",
                  rules: [{ required: true, message: "请输入账单名称" }],
                },
                component: "Input",
                componentProps: {
                  placeholder: "请输入",
                },
              },
              {
                FormItem: {
                  label: "金额",
                  name: "money",
                  rules: [{ required: true, message: "请输入金额" }],
                },
                component: "Number",
                componentProps: {
                  placeholder: "请输入",
                },
              },
              {
                FormItem: {
                  label: "类别",
                  name: "category",
                  rules: [{ required: true, message: "请选择类别" }],
                },
                component: "Select",
                componentProps: {
                  placeholder: "请选择",
                  options: billCategory,
                  fieldNames: { label: "name", value: "id" },
                },
              },
            ],
            Buttons: [
              {
                type: "primary",
                htmlType: "submit",
                text: "提交",
              },
              {
                type: "default",
                htmlType: "button",
                text: "取消",
                onClick: hideModal,
              },
            ],
          }}
        />
      </Modal>
    </>
  );
};
export default BillList;
