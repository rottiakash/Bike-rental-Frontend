import { Form, Input, Button, Checkbox } from "antd";
import React, { FC } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

const Login: FC = () => {
  const router = useRouter();
  return (
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
        onFinish={(values) => {
          console.log(values);
          setCookie(null, "token", "XYZ", {});
          router.push("/admin/bikes");
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
  );
};

export default Login;
