import React, { FC } from "react";
import Container from "../../HOCs/container";
import { Button, Form, Input, Select } from "antd";
import { config } from "../../pages/book";
const { Option } = Select;

interface UserDetailsProps {
  config: config;
}

const UserDetails: FC<UserDetailsProps> = ({ config }) => {
  return (
    <Container>
      <div style={{ marginTop: "30px", padding: "30px" }}>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          onFinish={(values) => {
            config.setReserve_payload({ ...config.reserve_payload, ...values });
            config.setStage(3);
          }}
        >
          <Form.Item
            label="Name"
            name="Name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input placeholder={"Enter Name"} />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your Age!" }]}
          >
            <Input placeholder={"Enter Age"} type="number" />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select placeholder="Select a option" allowClear>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder={"Enter Email"} type="email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true, message: "Please input your Address!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder={"Enter Address"} />
          </Form.Item>
          <Form.Item
            label="License Number"
            name="License"
            rules={[
              { required: true, message: "Please input your License Number!" },
            ]}
          >
            <Input placeholder={"Enter License Number"} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export default UserDetails;
