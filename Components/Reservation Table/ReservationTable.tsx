import { Button, Popconfirm, Table, notification } from "antd";
import Axios from "axios";
import { parseCookies } from "nookies";
import React, { FC, useState } from "react";
import Spinner from "../../HOCs/spinner";
import useConfig from "../../Hooks/useConfig";

export interface Reservation {
  booking_id: number;
  Name: string;
  age: number;
  gender: string;
  drivinglicense: string;
  address: string;
  email: string;
  sdate: string;
  edate: string;
  model: string;
  location: string;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Reservation Deleted",
    description: "The selected Reservation has been deleted",
  });
};

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
    title: "Email",
    dataIndex: "email",
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
  const { API_URL } = useConfig();
  const { token } = parseCookies(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>();
  return (
    <Spinner spinning={spinning}>
      <div>
        <Popconfirm
          title="Are you sure to delete this Reservation?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            setSpinning(true);
            await Axios.post(
              `${API_URL}/deleteReservation`,
              { id: selectedRow },
              {
                headers: { Authorization: `${token}` },
              }
            );
            openNotificationWithIcon("success");
            await sleep(2000);
            window.location.reload();
          }}
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
          rowKey={"booking_id"}
          dataSource={dataSource}
          columns={columns}
          expandable={{
            expandedRowRender: (row) => {
              return <p>Address: {row.address}</p>;
            },
          }}
          rowSelection={{
            type: "radio",
            onChange: (_, selectedRows) => {
              if (selectedRows) setSelected(true);
              else setSelected(false);
              setSelectedRow(selectedRows[0].booking_id);
            },
          }}
        />
      </div>
    </Spinner>
  );
};

export default ReservationTable;
