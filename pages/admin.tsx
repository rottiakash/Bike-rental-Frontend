import React, { FC, useCallback, useState } from "react";
import Container from "../HOCs/container";
import { parseCookies } from "nookies";
import Header from "../HOCs/Header/header";
import { Modal, Tabs, Form, Input, Button, notification } from "antd";
import BikeTable from "../Components/BikeTable/BikeTable";
import { Bike } from "./book";
import Axios from "axios";
import ReservationTable, {
  Reservation,
} from "../Components/Reservation Table/ReservationTable";
import useSWR from "swr";
import useConfig, { SERVER_URL } from "../Hooks/useConfig";
import Spinner from "../HOCs/spinner";
const { TabPane } = Tabs;

interface AdminProps {
  serverData: {
    bikes: Array<Bike>;
    reservations: Array<Reservation>;
  };
}

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Bike Added",
    description: "The Entered bike has been Added",
  });
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const fetcher = (data) =>
  Axios.get(data[0], {
    headers: { Authorization: `${data[1]}` },
  }).then((res) => res.data);

const Admin: FC<AdminProps> = ({ serverData }) => {
  const { token } = parseCookies(null);
  const { bikes, reservations } = serverData;
  const [visible, setVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const { API_URL } = useConfig();
  return (
    <Spinner spinning={spinning}>
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
                  onFinish={async (values) => {
                    setSpinning(true);
                    await Axios.post(`${API_URL}/insertBike`, values, {
                      headers: { Authorization: `${token}` },
                    });
                    openNotificationWithIcon("success");
                    setVisible(false);
                    await sleep(2000);
                    window.location.reload();
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
                      {
                        required: true,
                        message: "Please input Price per day!",
                      },
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
    </Spinner>
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
  const serverData = await Axios.get(`${SERVER_URL}/getAdmin`, {
    headers: { Authorization: `${token}` },
  }).then((x) => x.data);

  if (serverData == "TOKEN DECODE FAILED")
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: { serverData }, // will be passed to the page component as props
  };
}
