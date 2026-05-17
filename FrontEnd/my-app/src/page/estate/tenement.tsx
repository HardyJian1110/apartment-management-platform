import { Card, Row, Col, Table, Input, Button, Tag, Progress, Badge, Pagination, Popconfirm, message } from "antd";
import type { PaginationProps, TableProps } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { getBuildingList, batchDeleteBuilding } from "../../api/buildingList";
import { useDispatch } from "react-redux";

interface DataType {
  id: string;
  name: string;
  person: string;
  tel: string;
  status: string;
  vacancyRate: number;
  propertyFee: string;
}
export interface searchType {
  name: string;
  person: string;
}

function Temement() {
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<searchType>({
    name: "",
    person: "",
  });

  // parameters is required. cuz "reset" function has load(). If parameters are not passed, there will be closure issues(Get the data before setstate).
  const loadData = async (query = formData, p = page, ps = pageSize) => {
    setLoading(true);
    const {
      data: { list, total },
    } = await getBuildingList({ ...query, page: p, pageSize: ps });
    setLoading(false);
    setDataList(list);
    setTotal(total);
  };

  useEffect(() => {
    loadData();
  }, [page, pageSize]);

  // can not send request here. cuz setstate method is asynchronous
  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const reset = () => {
    // cuz can not get newest data(closure). So initialize parameters of loadData()
    const initialData = { name: "", person: "" };
    const initialPage = 1;
    const initialPageSize = 10;

    setSelectedRowKeys([]);
    setFormData({ name: "", person: "" });
    setPage(1);
    setPageSize(10);

    loadData(initialData, initialPage, initialPageSize);
  };

  const confirm = async function (id: string) {
    const { data } = await batchDeleteBuilding([id]);
    message.success(data);
    loadData();
  };

  // const edit = (record: DataType) => {
  //   setIsModalOpen(true);
  //   setTitle("Edit Enterprise");
  //   dispatch(setBuildingData(record));
  // };

  const hideModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No.",
      key: "index",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Building Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Person in Charge",
      dataIndex: "person",
      key: "person",
    },
    {
      title: "Manager Phone",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Usage Status",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        if (value == 1) {
          return <Tag color="#f50">Under Construction</Tag>;
        } else if (value == 2) {
          return <Tag color="#2db7f5">Completed</Tag>;
        } else {
          return <Tag color="#87d068">In Use</Tag>;
        }
      },
    },
    {
      title: "Vacancy Rate",
      dataIndex: "vacancyRate",
      key: "vacancyRate",
      render(value) {
        return <Progress percent={value} status="active" />;
      },
    },
    {
      title: "Property Fee Rate",
      dataIndex: "propertyFee",
      key: "propertyFee",
      render(value) {
        return <Badge color="green" text={value}></Badge>;
      },
    },
    {
      title: "Actions",
      key: "operate",
      render(value, record) {
        return (
          <>
            {/* <Button type="primary" className="mr" size="small" onClick={() => edit(record)}>
              Edit
            </Button> */}
            <Popconfirm
              title="Delete Confirmation"
              description="Are you sure you want to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => confirm(record.id)}
            >
              <Button type="primary" danger className="ml" size="small">
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Card className="search">
        <Row gutter={16}>
          <Col span={4}>
            <p>Building Name：</p>
            <Input name="name" value={formData.name} onChange={handleChange}></Input>
          </Col>
          <Col span={4}>
            <p>Person in Charge：</p>
            <Input name="person" value={formData.person} onChange={handleChange}></Input>
          </Col>
          <Col span={4}>
            <Button className="mr" type="primary" onClick={() => loadData()}>
              Search
            </Button>
            <Button className="ml" onClick={reset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt">
        <Table
          columns={columns}
          dataSource={dataList}
          pagination={false}
          loading={loading}
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          footer={() => (
            <div className="pagination">
              <Pagination
                className="fr mt"
                total={total}
                current={page}
                pageSize={pageSize}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
                onChange={onChange}
              />
            </div>
          )}
        />
      </Card>
    </div>
  );
}

export default Temement;

