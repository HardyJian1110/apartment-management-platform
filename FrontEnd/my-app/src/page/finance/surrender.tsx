import { Card, Button, Descriptions, Spin, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import type { DescriptionsProps } from "antd";
// Assume this API is already implemented
import { getContractDetail } from "../../api/contract";

// Define the data type returned from the backend (strictly matching database column names)
interface ContractDetail {
  contractNo: string;
  type: string;
  name: string;
  startDate: string;
  endDate: string;
  partyA: string;
  partyB: string;
  status: number;
  rejectionReason?: string;
  tel: string;
  additionalTerms?: string;
}

function Surrender() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contractNo = searchParams.get("contractNo");

  const [data, setData] = useState<ContractDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Request data from backend
  useEffect(() => {
    if (contractNo) {
      loadDetail(contractNo);
    }
  }, [contractNo]);

  const loadDetail = async (no: string) => {
    setLoading(true);
    try {
      // This endpoint corresponds to backend @GetMapping("/detail/{contractNo}")
      const res = await getContractDetail(no);
      setData(res.data);
    } catch (error) {
      message.error("Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };
  // 2. Dynamically generate Descriptions items
  const items: DescriptionsProps["items"] = useMemo(() => {
    if (!data) return [];

    // [Key fix]: explicitly declare the type as DescriptionsProps["items"]
    const baseItems: DescriptionsProps["items"] = [
      { key: "1", label: "Contract Type", children: data.type },
      { key: "2", label: "Contract Name", children: data.name },
      { key: "3", label: "Contract Start Date", children: data.startDate },
      { key: "4", label: "Contract End Date", children: data.endDate },
      { key: "5", label: "Party A", children: data.partyA },
      { key: "6", label: "Party B", children: data.partyB, span: 3 },
      {
        key: "7",
        label: "Approval Status",
        children: data.status === 1 ? "Pending Approval" : data.status === 2 ? "Approved" : "Rejected",
      },
    ];

    if (data.status === 3) {
      baseItems.push({ key: "8", label: "Rejection Reason", children: data.rejectionReason || "None" });
    }

    baseItems.push({ key: "9", label: "Contact Info", children: data.tel });

    // No error here now, because baseItems already knows children can be ReactNode
    baseItems.push({
      key: "10",
      label: "Additional Terms",
      children: <div style={{ whiteSpace: "pre-wrap" }}>{data.additionalTerms || "No additional terms"}</div>,
    });

    return baseItems;
  }, [data]);
  return (
    <div>
      <Card>
        <Button type="primary" onClick={() => navigate("/finance/contract?return=true")}>
          Back
        </Button>
      </Card>

      <Card className="mt">
        <Spin spinning={loading}>
          {data && <Descriptions title={`Contract No.：${data.contractNo}`} bordered items={items} />}
        </Spin>
      </Card>
    </div>
  );
}

export default Surrender;

