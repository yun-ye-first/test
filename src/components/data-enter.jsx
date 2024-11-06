import React from "react";
import { Input, InputNumber, Select } from "antd";

const App = (props) => {
  const _props = {};
  Object.keys(props).map((key) => {
    if (key !== "component") {
      _props[key] = props[key];
    }
  });

  return (
    <>
      {props.component === "Input" ? <Input {..._props} /> : null}
      {props.component === "Number" ? <InputNumber {..._props} /> : null}
      {props.component === "Select" ? <Select {..._props} /> : null}
    </>
  );
};

export default App;
