import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Space } from "antd";
import DataEnter from "./data-enter";

const App = (props) => {
  const [config, setConfig] = useState(null);
  useEffect(() => {
    const defaultProps = {
      RowProps: {
        gutter: [10, 10],
      },
      ColProps: {
        span: 8,
      },
      FormProps: {
        labelCol: {
          flex: "100px",
        },
      },
      Fields: [],
      Buttons: [
        {
          type: "primary",
          htmlType: "submit",
          text: "提交",
        },
      ],
      ButtonsColProps: {
        span: 24,
      },
    };
    Object.keys(props.Config).forEach((key) => {
      if (!defaultProps[key] || Array.isArray(defaultProps[key])) {
        defaultProps[key] = props.Config[key];
      } else if (defaultProps[key]) {
        Object.assign(defaultProps[key], props.Config[key]);
      }
    });
    setConfig(defaultProps);
  }, [props.Config]);

  return (
    <>
      {config ? (
        <div>
          <Form {...config.FormProps}>
            <Row {...config.RowProps}>
              {config.Fields.map((field, index) => {
                return (
                  <Col key={index} {...(field.ColProps || config.ColProps)}>
                    <Form.Item {...field.FormItem}>
                      <DataEnter
                        component={field.component}
                        {...field.componentProps}
                      />
                    </Form.Item>
                  </Col>
                );
              })}
              {config.Buttons ? (
                <Col key="button" {...config.ButtonsColProps}>
                  <Form.Item>
                    <Space>
                      {config.Buttons.map((item, index) => {
                        return (
                          <Button key={index} {...item}>
                            {item.text}
                          </Button>
                        );
                      })}
                    </Space>
                  </Form.Item>
                </Col>
              ) : null}
            </Row>
          </Form>
        </div>
      ) : null}
    </>
  );
};
export default App;
