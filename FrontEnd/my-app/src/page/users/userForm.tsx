import { Modal, Row, Col, Form, Input, Radio, message } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { editUser } from "../../api/userList";
interface FormProps {
  visible: boolean;
  hideModal: () => void;
  title: string;
  loadData: () => void;
}

function UserForm(props: FormProps) {
  const [form] = Form.useForm();
  const { userData } = useSelector((state: any) => state.userSlice);
  const { visible, hideModal, title, loadData } = props;
  const handleOk = () => {
    form
      .validateFields()
      .then(async (res) => {
        // Merge the form data res and the id from the original data.
        const submitData = { ...res, id: userData.id };

        const { data } = await editUser(submitData);
        message.success(data);
        hideModal();
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    title == "Add Enterprise" ? form.resetFields() : form.setFieldsValue(userData);
  }, [visible]);
  return (
    <>
      <Modal title={title} open={visible} onCancel={hideModal} width={800} onOk={handleOk}>
        <Form form={form} labelWrap labelCol={{ flex: "170px" }} wrapperCol={{ flex: "auto" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Customer Name" name="name" rules={[{ required: true, message: "Customer Name is required" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Contact Phone" name="tel" rules={[{ required: true, message: "Contact Phone is required" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Business Status" name="status" rules={[{ required: true, message: "Business Status is required" }]}>
                <Radio.Group>
                  <Radio value="1">Operating</Radio>
                  <Radio value="2">Suspended</Radio>
                  <Radio value="3">Closed</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Industry" name="business" rules={[{ required: true, message: "Industry is required" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Unified Credit Code"
                name="creditCode"
                rules={[{ required: true, message: "Unified Credit Code is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Business Registration Number"
                name="industryNum"
                rules={[{ required: true, message: "Business Registration Number is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Organization Code"
                name="organizationCode"
                rules={[{ required: true, message: "Organization Code is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Legal Representative"
                name="legalPerson"
                rules={[{ required: true, message: "Legal Representative is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default UserForm;

