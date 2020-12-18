import { Form, Input, Button, message, Spin } from "antd";
import ValidateErrorEntity from "rc-field-form/lib/interface";
import { LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import qs from "qs";
import { Redirect } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { IResponse } from "../../interface";
import "./index.css";

enum LoginStatus {
  LOGING = 0,
  LOGED = 1,
  ERROR = -1,
}

interface IFormProps {
  password: string;
}

type ILoginResponse = IResponse<boolean>;

const Login: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.ERROR);

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity.ValidateErrorEntity<IFormProps>
  ) => {
    console.log(errorInfo);
  };

  const onFinish = (values: IFormProps) => {
    if (values.password && values.password !== "") {
      setLoginStatus(LoginStatus.LOGING);
      axios
        .post(
          "/api/login",
          qs.stringify({
            password: values.password,
          }),
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res: AxiosResponse<ILoginResponse>) => {
          if (res.data.result || res.data.errMsg === "you had logined !") {
            message.success("登陆成功！");
            setLoginStatus(LoginStatus.LOGED);
          } else {
            setLoginStatus(LoginStatus.ERROR);
            message.error(res.data.errMsg);
          }
        });
    } else {
      message.warning("请填写有效的密码");
    }
  };

  if (loginStatus === LoginStatus.LOGED) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
      <Spin spinning={loginStatus === LoginStatus.LOGING}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Login;
