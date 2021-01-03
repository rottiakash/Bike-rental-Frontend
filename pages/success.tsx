import Container from "../HOCs/container";
import { Result, Button } from "antd";
import { Typography, notification } from "antd";
import { Divider } from "antd";
import { Rate } from "antd";

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const { Title } = Typography;

const openNotification = () => {
  notification.open({
    message: "Review Has been Submitted",
    description: "Thank you for your valuable review",
    placement: "bottomRight",
  });
};

import Link from "next/link";
import { useState } from "react";
export default function Success() {
  const [rating, setRating] = useState<number>();
  const [disabled, setDisabled] = useState(false);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Result
          status="success"
          title="Successfully made Bike Rental Reservation!"
          extra={[
            <Link href="/">
              <Button type="primary" key="console">
                Go Home
              </Button>
            </Link>,
          ]}
        />
        <Divider />
        <Title>Rate the experience</Title>
        <Rate
          tooltips={disabled ? null : desc}
          onChange={(value) => setRating(value)}
          value={rating}
          disabled={disabled}
        />
        {rating ? (
          <span className="ant-rate-text">{desc[rating - 1]}</span>
        ) : (
          "Not Rated"
        )}
        <Button
          type="primary"
          onClick={() => {
            openNotification();
            setDisabled(true);
          }}
          disabled={disabled}
        >
          Submit Rating
        </Button>
      </div>
      ,
    </Container>
  );
}
