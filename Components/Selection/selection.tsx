import React, { FC, useState } from "react";
import { Bike, config } from "../../pages/book";
import { Button, DatePicker, Space } from "antd";
import { Form } from "antd";
import { Select } from "antd";
import * as a from "axios";
import Spinner from "../../HOCs/spinner";
import useConfig from "../../Hooks/useConfig";
const axios = a.default;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
interface SelectionProps {
  config: config;
}

const Selection: FC<SelectionProps> = ({ config }) => {
  const [spinning, setSpinning] = useState(false);
  const { API_URL } = useConfig();
  return (
    <Spinner spinning={spinning}>
      <Form
        onFinish={async (values) => {
          setSpinning(true);
          const payload = {
            startDate: values.dates[0].format(dateFormat),
            endDate: values.dates[1].format(dateFormat),
            location: values.location,
          };
          //POST PAYLOAD - GET BIKES
          axios.post(`${API_URL}/available`, payload);
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
          config.setBikes(bikes);
          config.setStartDate(payload.startDate);
          config.setEndDate(payload.endDate);
          config.setStage(1);
        }}
      >
        <Form.Item
          label="Start and End date for the Rental"
          name="dates"
          rules={[{ required: true, message: "Please input the Date Range" }]}
        >
          <RangePicker format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="Pickup/Drop Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input the Location for Pick-up/Drop",
            },
          ]}
        >
          <Select showSearch placeholder={"Select the location"}>
            {config.locations.map((x) => (
              <Option value={x} key={x}>
                {x}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spinner>
  );
};

export default Selection;
