import React, { FC } from "react";
import Container from "../../HOCs/container";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const UserDetails: FC = () => {
  return (
    <Container>
      <div style={{ marginTop: "30px", padding: "30px" }}>
        <Form>
          <Form.Item
            label="Name"
            name="name"
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
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input placeholder={"Enter Address"} />
          </Form.Item>
          <Form.Item
            label="License Number"
            name="license"
            rules={[
              { required: true, message: "Please input your License Number!" },
            ]}
          >
            <Input placeholder={"Enter License Number"} />
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export default UserDetails;
