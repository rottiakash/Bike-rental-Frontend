import { FC, useState } from "react";
import { config } from "../../pages/book";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { DatePicker } from "antd";
import { Form, Input, Button, notification } from "antd";
import { useRouter } from "next/router";
import Spinner from "../../HOCs/spinner";
import useConfig from "../../Hooks/useConfig";
import Axios from "axios";
interface PaymentProps {
  config: config;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Reservation Done",
    description: "The selected bike has been Reserved",
  });
};

interface Card {
  cvc: string;
  expiry: string;
  focus: string;
  name: string;
  number: string;
}

const Payment: FC<PaymentProps> = ({ config }) => {
  const { API_URL } = useConfig();
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();
  const [card, setCard] = useState<Card>({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  return (
    <Spinner spinning={spinning}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Cards
          cvc={card.cvc}
          expiry={card.expiry}
          focused={card.focus}
          name={card.name}
          number={card.number}
        />
        <Form
          style={{ marginTop: "40px" }}
          onFinish={async () => {
            setSpinning(true);
            const data = await Axios.post(
              `${API_URL}/reserve`,
              config.reserve_payload
            ).then((x) => x.data);
            if (data == "Done") {
              openNotificationWithIcon("success");
              await sleep(2000);
              router.push("/success");
            } else {
              window.alert(
                `The Payment was not completed. Please try again in some time`
              );
            }
          }}
        >
          <Form.Item
            label="Card Number"
            name="Card Number"
            rules={[
              { required: true, message: "Please input your Card Number!" },
            ]}
          >
            <Input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              onFocus={(e) => setCard({ ...card, focus: e.target.name })}
            />
          </Form.Item>
          <Form.Item
            label="Card Holder's Name"
            name="Card Holder's Name"
            rules={[
              { required: true, message: "Please input Card Holder's Name!" },
            ]}
          >
            <Input
              type="text"
              name="name"
              placeholder="Card Holder Name"
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              onFocus={(e) => setCard({ ...card, focus: e.target.name })}
            />
          </Form.Item>
          <Form.Item label="Valid Through" name="Valid Through">
            <DatePicker
              onChange={(date, _) =>
                setCard({ ...card, expiry: date.format("MM") })
              }
              format={"MM"}
              picker="month"
            />
            <DatePicker
              picker="year"
              onChange={(date, _) =>
                setCard({
                  ...card,
                  expiry: (card.expiry += "/" + date.format("YY")),
                })
              }
              format={"YY"}
            />
          </Form.Item>
          <Form.Item
            label="CVV"
            name="CVV"
            rules={[{ required: true, message: "Please input CVV" }]}
          >
            <Input
              type="tel"
              name="cvc"
              placeholder="CVV/CVC"
              onChange={(e) => setCard({ ...card, cvc: e.target.value })}
              onFocus={(e) => setCard({ ...card, focus: e.target.name })}
            />
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

export default Payment;
