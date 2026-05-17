import { Card, Table, Row, Col, Input, Button, Tag, Pagination } from "antd";
import { useEffect, useState } from "react";
import { TableProps } from "antd";
import { getContractList } from "../../api/contract";
import { setData, setTotal, setCurrent, setFormList, setSize } from "../../store/finance/contractSlice";
import { useDispatch, useSelector } from "react-redux";
import { PaginationProps } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SearchType {
  contractNo: string;
  person: string;
  tel: string;
}

interface DataType {
  id: string;
  contractNo: string;
  type: string;
  name: string;
  startDate: string;
  endDate: string;
  partyA: string;
  partyB: string;
  status: string;
}
function Dashboard() {
  const { data, total, formList, size, current } = useSelector((state: any) => state.contractSlice);
  const [formData, setFormData] = useState<SearchType>({
    contractNo: "",
    person: "",
    tel: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isReturn = searchParams.get("return");
  const [pageSize, setPageSize] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    dispatch(
      setFormList({
        ...formData,
        [name]: value,
      })
    );
  };

  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    dispatch(setCurrent(page));
    dispatch(setSize(pageSize));
    loadData(formData, page, pageSize);
  };

  const loadData = async (query = formData, p = page, ps = pageSize) => {
    setLoading(true);
    const {
      data: { list, total },
    } = await getContractList({ ...query, page: p, pageSize: ps });
    setLoading(false);
    dispatch(setData(list));
    dispatch(setTotal(total));
  };
  const detail = (contractNo: string) => {
    navigate("/finance/surrender?contractNo=" + contractNo);
  };
  const reset = () => {
    const initialData = { contractNo: "", person: "", tel: "" };

    setFormData({ contractNo: "", person: "", tel: "" });
    setPage(1);
    setPageSize(10);
    loadData(initialData, 1, 10);
  };

  useEffect(() => {
    if (!isReturn || !data.length) {
      loadData(formData, page, pageSize);
    }
    if (isReturn) {
      setFormData(formList);
      setPage(current);
      setPageSize(size);
    }
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No.",
      key: "index",
      render(value, record, index) {
        return index + 1;
      },
    },
    {
      title: "Contract No.",
      dataIndex: "contractNo",
      key: "contractNo",
    },
    {
      title: "Contract Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Contract Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contract Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Contract End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Party A",
      dataIndex: "partyA",
      key: "partyA",
    },
    {
      title: "Party B",
      dataIndex: "partyB",
      key: "partyB",
    },
    {
      title: "Approval Status",
      dataIndex: "status",
      key: "status",
      render(value) {
        if (value == 1) {
          return <Tag>Pending Approval</Tag>;
        } else if (value == 2) {
          return <Tag color="green">Approved</Tag>;
        } else {
          return <Tag color="red">Rejected</Tag>;
        }
      },
    },
    {
      title: "Actions",
      key: "operate",
      render(value, record) {
        return (
          <Button type="primary" size="small" onClick={() => detail(record.contractNo)}>
            Contract Details
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <Card className="search">
        <Row gutter={16}>
          <Col span={7}>
            <p>Contract No.：</p>
            <Input name="contractNo" value={formData.contractNo} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>Contact:</p>
            <Input name="person" value={formData.person} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>Contact Phone：</p>
            <Input name="tel" value={formData.tel} onChange={handleChange} />
          </Col>
          <Col span={3}>
            <Button type="primary" className="mr" onClick={() => loadData(formData, page, pageSize)}>
              Search
            </Button>
            <Button onClick={reset}>Reset</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt">
        <Table
          columns={columns}
          pagination={false}
          loading={loading}
          dataSource={data}
          rowKey={(record) => record.contractNo}
        />
        <Pagination
          className="mt fr"
          showQuickJumper
          defaultCurrent={1}
          total={total}
          onChange={onChange}
          current={page}
          pageSize={pageSize}
        />
      </Card>
    </div>
  );
}

export default Dashboard;

