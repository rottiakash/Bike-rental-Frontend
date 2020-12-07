import { Dispatch, FC, SetStateAction, useState } from "react";
import Selection from "../Components/Selection/selection";
import Container from "../HOCs/container";
import Header from "../HOCs/Header/header";
import { Steps } from "antd";
import Bikes from "../Components/Bikes/bikes";
import UserDetails from "../Components/UserDetails/UserDetails";
import Payment from "../Components/Payment/Payment";
const { Step } = Steps;

interface BookProps {
  locations: Array<string>;
}

export interface Bike {
  id: number;
  name: string;
  price: number;
  img_url: string;
}

export interface config {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  locations: Array<string>;
  bikes: Array<Bike>;
  setBikes: Dispatch<SetStateAction<Bike[]>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  reserve_payload: {
    id: number;
    startDate: string;
    endDate: string;
    Name?: string;
    Address?: string;
    License?: string;
    gender?: string;
    age?: number;
  };
  setReserve_payload: Dispatch<
    SetStateAction<{
      id: number;
      startDate: string;
      endDate: string;
      Name?: string;
      Address?: string;
      License?: string;
      gender?: string;
      age?: number;
    }>
  >;
}

const Book: FC<BookProps> = ({ locations }) => {
  const [stage, setStage] = useState<number>(0);
  const [bikes, setBikes] = useState<Array<Bike>>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [reserve_payload, setReserve_payload] = useState<{
    id: number;
    startDate: string;
    endDate: string;
    Name?: string;
    Address?: string;
    License?: string;
    gender?: string;
    age?: number;
  }>();
  const config: config = {
    stage,
    setStage,
    locations,
    bikes,
    setBikes,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    reserve_payload,
    setReserve_payload,
  };
  return (
    <Container>
      <Header heading={"Book a Bike"} showHome />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          padding: "30px",
        }}
      >
        <Steps current={stage}>
          <Step title="Select Date and Location" />
          <Step title="Select Bike" />
          <Step title="Enter Details" />
          <Step title="Payment" />
        </Steps>
      </div>

      {stage == 0 && (
        <div
          style={{
            paddingTop: "50px",
            padding: "30px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Selection config={config} />
        </div>
      )}
      {stage == 1 && <Bikes config={config} />}
      {stage == 2 && <UserDetails config={config} />}
      {stage == 3 && <Payment config={config} />}
    </Container>
  );
};

export async function getServerSideProps(context) {
  let locations = ["Rajajinagar", "Basaveshwarnagar", "MG Road"]; //GET from server
  return {
    props: { locations }, // will be passed to the page component as props
  };
}

export default Book;
