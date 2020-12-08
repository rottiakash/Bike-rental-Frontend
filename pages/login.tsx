import { Form, Input, Button, Checkbox } from "antd";
import React, { FC, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import Axios from "axios";
import useConfig from "../Hooks/useConfig";
import Spinner from "../HOCs/spinner";
const Login: FC = () => {
  const [spinning, setSpinning] = useState(false);
  const { API_URL } = useConfig();
  const router = useRouter();
  return (
    <Spinner spinning={spinning}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "3rem" }}>Admin Login</span>
        <Form
          onFinish={async (values) => {
            setSpinning(true);
            const res = await Axios.post(`${API_URL}/login`, values);
            if (res.data == "BAD CREDS")
              window.alert(`Wrong Username/Password`);
            else {
              setCookie(null, "token", res.data, {});
              router.push("/admin");
            }
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spinner>
  );
};

export default Login;
