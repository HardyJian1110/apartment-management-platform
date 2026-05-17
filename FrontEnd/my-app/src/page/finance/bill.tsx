import {
  Card,
  Row,
  Col,
  Input,
  Table,
  Pagination,
  Statistic,
  DatePicker,
  Select,
  Button,
  Tag,
  Popconfirm,
  message,
} from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { getBillList, batchDeleteBill } from "../../api/contract";
import { useEffect, useMemo, useState } from "react";
import { exportToExcel } from "../../utils/exportToExcel";
const { RangePicker } = DatePicker;

interface DataType {
  id: string;
  accountNo: string;
  status?: string;
  roomNo?: string;
  carNo?: string;
  tel?: string;
  costName1?: string;
  costName2?: string;
  costName3?: string;
  startDate?: string;
  endDate?: string;
  preferential?: number;
  money?: number;
  pay?: string;
}
interface SearchType {
  date: string[] | null;
  no?: string;
  status?: string;
  page: number;
  pageSize: number;
}

function Bill() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No.",
      key: "index",
      render(value, record, index) {
        return index + 1;
      },
      width: 100,
      fixed: "left",
    },
    {
      title: "Bill No.",
      dataIndex: "accountNo",
      key: "accountNo",
      width: 150,
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render(value) {
        return value == 1 ? <Tag color="green">Paid</Tag> : <Tag color="red">Unpaid</Tag>;
      },
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
      width: 100,
    },
    {
      title: "Parking Spot No.",
      dataIndex: "carNo",
      key: "carNo",
      width: 150,
    },
    {
      title: "Phone Number",
      dataIndex: "tel",
      key: "tel",
      width: 150,
    },
    {
      title: "Property Fee (Yearly)",
      dataIndex: "costName1",
      key: "costName1",
      width: 180,
    },

    {
      title: "Parking Fee",
      dataIndex: "costName2",
      key: "costName2",
      width: 150,
    },
    {
      title: "Rent",
      dataIndex: "costName3",
      key: "costName3",
      width: 150,
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 150,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
    },
    {
      title: "Discount Amount",
      dataIndex: "preferential",
      key: "preferential",
      width: 160,
    },
    {
      title: "Total Receivable",
      dataIndex: "money",
      key: "money",
      width: 170,
    },
    {
      title: "Payment Method",
      dataIndex: "pay",
      key: "pay",
      width: 130,
    },
    {
      title: "Actions",
      width: 230,
      key: "operate",
      fixed: "right",
      render(value, record) {
        return (
          <>
            {/* <Button type="primary" size="small">
              Print
            </Button> */}
            <Popconfirm
              title="Delete Confirmation"
              description="Are you sure you want to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => confirm(record.id)}
            >
              <Button type="primary" size="small" danger className="ml mr">
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const [formData, setFormData] = useState<SearchType>({
    date: [],
    no: "",
    status: "",
    page: 1,
    pageSize: 10,
  });

  const [dataList, setDataList] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>({ accountNo: "" });
  const handleChange = (value: any, dateString: any) => {
    console.log(value, dateString);
    setFormData((prevState) => ({
      ...prevState,
      date: dateString,
    }));
  };
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      no: value,
    }));
  };
  const handleChange2 = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: any) => {
    console.log(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
  };

  const disabled = useMemo(() => {
    return selectedRowKeys.length ? false : true;
  }, [selectedRowKeys]);

  const loadData = async (query = formData, p = page, ps = pageSize) => {
    setLoading(true);
    const {
      data: { list, total },
    } = await getBillList({
      page: p,
      pageSize: ps,
      startDate: query.date ? query.date[0] : undefined,
      endDate: query.date ? query.date[1] : undefined,
      no: query.no,
      status: query.status,
    });
    setLoading(false);
    setDataList(list);
    setTotal(total);
  };
  const header = [
    "accountNo",
    "status",
    "roomNo",
    "carNo",
    "tel",
    "costName1",
    "costName2",
    "costName3",
    "startDate",
    "endDate",
    "preferential",
    "money",
    "pay",
  ];
  useEffect(() => {
    loadData();
  }, [page, pageSize]);
  const onChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const reset = () => {
    const initialData: SearchType = {
      date: [],
      no: "",
      status: "",
      page: 1,
      pageSize: 10,
    };

    setFormData(initialData);
    setPage(1);
    setPageSize(10);
    loadData(initialData);
  };
  const confirm = async function (id: string) {
    const { data } = await batchDeleteBill([id]);
    message.success(data);
    loadData();
  };

  const batchDelete = async () => {
    const { data } = await batchDeleteBill(selectedRowKeys);
    message.success(data);
    loadData();
  };
  return (
    <div>
      <Card>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="Receivable Bill Amount" value="16,876.38" />
          </Col>
          <Col span={6}>
            <Statistic title="Paid Bill Amount" value="6,952.00" />
          </Col>
          <Col span={6}>
            <Statistic title="Refunded Bill Amount" value="2,355.23" />
          </Col>
          <Col span={6}>
            <Statistic title="Unpaid Bill Amount" value="9,962.00" />
          </Col>
        </Row>
      </Card>
      <Card className="mt search">
        <Row gutter={16}>
          <Col span={6}>
            <p>Bill Date</p>
            <RangePicker name="date" style={{ width: "100%" }} onChange={handleChange} />
          </Col>
          <Col span={6}>
            <p>Room/Parking No.:</p>
            <Input
              placeholder="Please enter the room number or parking spot number"
              value={formData.no}
              onChange={handleChange1}
            />
          </Col>
          <Col span={6}>
            <p>Payment Status</p>
            <Select
              style={{ width: "100%" }}
              value={formData.status}
              options={[
                { value: "", label: "All" },
                { value: "1", label: "Paid" },
                { value: "2", label: "Unpaid" },
              ]}
              onChange={handleChange2}
            ></Select>
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              className="mr"
              onClick={() => {
                loadData();
              }}
            >
              Search
            </Button>
            <Button onClick={reset}>Reset</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          disabled={disabled}
          onClick={() => exportToExcel(selectedRows, header)}
        >
          Export to Excel
        </Button>
        <Button
          icon={<DeleteOutlined />}
          danger
          className="ml"
          type="primary"
          disabled={disabled}
          onClick={batchDelete}
        >
          Batch Void
        </Button>
      </Card>
      <Card className="mt">
        <Table
          dataSource={dataList}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.accountNo}
          rowSelection={rowSelection}
          scroll={{ x: 1500 }}
        />
        <Pagination
          className="fr mt"
          showQuickJumper
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
        />
      </Card>
    </div>
  );
}

export default Bill;

