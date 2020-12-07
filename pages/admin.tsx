import React, { FC, useState } from "react";
import Container from "../HOCs/container";
import { parseCookies } from "nookies";
import Header from "../HOCs/Header/header";
import { Modal, Tabs, Form, Input, Button } from "antd";
import BikeTable from "../Components/BikeTable/BikeTable";
import { Bike } from "./book";
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
    <Container>
      <Header heading={"Admin Portal"} showHome showLogout />
      <Tabs defaultActiveKey="1">
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
    </Container>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  const bikes: Array<Bike> = [
    {
      id: 1,
      model: "Bullet",
      priceperday: 100,
      location: "Rajajinagar",
      no_of_units: 10,
      imageurl:
        "https://imgd.aeplcdn.com/393x221/bw/models/royal-enfield-bullet-350-ks--x--efi-bs-vi20200401130113.jpg?q=85",
    },
  ];
  const reservations: Array<Reservation> = [];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { bikes, reservations }, // will be passed to the page component as props
  };
}
