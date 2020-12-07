import { Button, Popconfirm, Table } from "antd";
import React, { FC, useState } from "react";
import { Bike } from "../../pages/book";

export interface Reservation {
  booking_id: number;
  Name: string;
  age: number;
  gender: string;
  drivinglicense: string;
  address: string;
  sdate: string;
  edate: string;
  model: string;
  location: string;
}

interface ReservationTableProps {
  dataSource: Array<Reservation>;
}

const columns = [
  {
    title: "ID",
    dataIndex: "booking_id",
  },
  {
    title: "Name",
    dataIndex: "Name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Driving License",
    dataIndex: "drivinglicense",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Start date",
    dataIndex: "sdate",
  },
  {
    title: "End date",
    dataIndex: "edate",
  },
  {
    title: "Model",
    dataIndex: "model",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
];

const ReservationTable: FC<ReservationTableProps> = ({ dataSource }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <Popconfirm
        title="Are you sure to delete this Bike?"
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          disabled={!selected}
          style={{
            width: "100vw",
            marginTop: "40px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Delete
        </Button>
      </Popconfirm>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          type: "radio",
          onChange: (_, selectedRows) => {
            if (selectedRows) setSelected(true);
            else setSelected(false);
          },
        }}
      />
    </div>
  );
};

export default ReservationTable;
