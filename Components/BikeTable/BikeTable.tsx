import { Button, Popconfirm, Table } from "antd";
import React, { FC, useState } from "react";
import { Bike } from "../../pages/book";

interface BikeTableProps {
  dataSource: Array<Bike>;
}

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Image",
    dataIndex: "imageurl",
    key: "imageurl",
  },
  {
    title: "Price/Day",
    dataIndex: "priceperday",
    key: "priceperday",
  },
  {
    title: "No. Of Units",
    dataIndex: "no_of_units",
    key: "no_of_units",
  },
];

const BikeTable: FC<BikeTableProps> = ({ dataSource }) => {
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

export default BikeTable;
