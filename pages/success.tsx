import Container from "../HOCs/container";
import { Result, Button } from "antd";
import Link from "next/link";
export default function Success() {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
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
      </div>
      ,
    </Container>
  );
}
