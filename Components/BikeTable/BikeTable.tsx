import { Button, Popconfirm, Table, notification } from "antd";
import React, { FC, useState } from "react";
import { Bike } from "../../pages/book";
import Axios from "axios";
import useConfig from "../../Hooks/useConfig";
import { parseCookies } from "nookies";
import Spinner from "../../HOCs/spinner";
interface BikeTableProps {
  dataSource: Array<Bike>;
}
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Bike Deleted",
    description: "The selected bike has been deleted",
  });
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Model",
    dataIndex: "model",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Image",
    dataIndex: "imageurl",
  },
  {
    title: "Price/Day",
    dataIndex: "priceperday",
  },
  {
    title: "No. Of Units",
    dataIndex: "no_of_units",
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BikeTable: FC<BikeTableProps> = ({ dataSource }) => {
  const { API_URL } = useConfig();
  const { token } = parseCookies(null);
  const [selected, setSelected] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>();
  return (
    <Spinner spinning={spinning}>
      <div>
        <Popconfirm
          title="Are you sure to delete this Bike?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            setSpinning(true);
            await Axios.post(
              `${API_URL}/deleteBike`,
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
          dataSource={dataSource}
          columns={columns}
          rowKey={"id"}
          rowSelection={{
            type: "radio",
            onChange: (_, selectedRows) => {
              if (selectedRows) setSelected(true);
              else setSelected(false);

              setSelectedRow(selectedRows[0].id);
            },
          }}
        />
      </div>
    </Spinner>
  );
};

export default BikeTable;
