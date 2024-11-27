import { Form, Button, Input, Select } from "antd";
import "./Them.css";
import formatQuyen from "../../../../utils/formatQuyen";
import { them, checkDataFields } from "../../../../services/TaiKhoanAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";

const { Option } = Select;

function Them(props) {
  const [form] = Form.useForm();

  const themTaiKhoan = async (values) => {
    const data = await them(values);
    if (data.error) {
      NotifyError(data.error);
    } else if (data.inputInvalid) {
      form.setFields([
        {
          name: data.inputInvalid,
          errors: [data.messageInvalid],
        },
      ]);
    } else {
      NotifySuccess("Thêm tài khoản thành công");
      const newDs = [...props.dsTaiKhoan]
      values.id = data.taiKhoan
      newDs.push(values)
      props.setDsTaiKhoan(newDs)
      form.resetFields();
    }
  };

  return (
    <div
      className="Them"
      onClick={(e) => {
        if (e.target.className === "Them") {
          props.setChucNang("");
        }
      }}
    >
      <div className="Them_content">
        <Form
          onFinish={(values) => {
            themTaiKhoan(values);
          }}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Tên người dùng"
            name="tennguoidung"
            rules={[
              { required: true, message: " Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="tendangnhap"
            rules={[
              { required: true, message: " Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: " Vui lòng nhập Email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="sodienthoai"
            rules={[
              { required: true, message: " Vui lòng nhập Số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quyền"
            name="idquyen"
            rules={[{ required: true, message: "Vui chọn Quyền!" }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value={0}>
                <p>{formatQuyen(0)}</p>
              </Option>
              <Option value={1}>
                <p>{formatQuyen(1)}</p>
              </Option>
              <Option value={2}>
                <p>{formatQuyen(2)}</p>
              </Option>
              <Option value={3}>
                <p>{formatQuyen(3)}</p>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: "10px", backgroundColor: "var(--primary-color)" }}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Them;
