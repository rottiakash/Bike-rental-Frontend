import React, { FC, useState } from "react";
import Container from "../HOCs/container";
import { parseCookies } from "nookies";
import Header from "../HOCs/Header/header";
import { Modal, Tabs, Form, Input, Button } from "antd";
import BikeTable from "../Components/BikeTable/BikeTable";
import { Bike } from "./book";
import Axios from "axios";
import ReservationTable, {
  Reservation,
} from "../Components/Reservation Table/ReservationTable";

const { TabPane } = Tabs;

interface AdminProps {
  bikes: Array<Bike>;
  reservations: Array<Reservation>;
}

const Admin: FC<AdminProps> = ({ bikes, reservations }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Header heading={"Admin Portal"} showHome showLogout />
      <Tabs defaultActiveKey="1" style={{ padding: "10px" }}>
        <TabPane tab="Bikes" key="1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button type="primary" onClick={() => setVisible(true)}>
              Add Bike
            </Button>
            <BikeTable dataSource={bikes} />
            <Modal
              title="Add Bike"
              visible={visible}
              cancelButtonProps={{ style: { visibility: "hidden" } }}
              onOk={() => setVisible(false)}
              okText="Cancel"
              closable={false}
            >
              <Form
                onFinish={(values) => {
                  console.log(values);
                  //POST TO SERVER
                  setVisible(false);
                }}
              >
                <Form.Item
                  label="ID"
                  name="id"
                  rules={[{ required: true, message: "Please input ID!" }]}
                >
                  <Input type="tel" />
                </Form.Item>
                <Form.Item
                  label="Model"
                  name="model"
                  rules={[{ required: true, message: "Please input Model!" }]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[
                    { required: true, message: "Please input Location!" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="Price per day"
                  name="priceperday"
                  rules={[
                    { required: true, message: "Please input Price per day!" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Number of Units"
                  name="no_of_units"
                  rules={[
                    {
                      required: true,
                      message: "Please input Number of Units!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Image URL"
                  name="imageurl"
                  rules={[
                    {
                      required: true,
                      message: "Please input Number of Image URL!",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </TabPane>
        <TabPane tab="Reservations" key="2">
          <ReservationTable dataSource={reservations} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const res = await Axios.get(`http://localhost:5000/getBikes`, {
    headers: { Authorization: `${token}` },
  });
  if (res.data == "TOKEN DECODE FAILED")
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  const bikes: Array<Bike> = res.data.result;
  const res1 = await Axios.get(`http://localhost:5000/getReservations`, {
    headers: { Authorization: `${token}` },
  });
  if (res1.data == "TOKEN DECODE FAILED")
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const reservations: Array<Reservation> = res1.data.result;

  return {
    props: { bikes, reservations }, // will be passed to the page component as props
  };
}
