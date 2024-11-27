import { Form, Button, Input, Select } from "antd";
import "./Sua.css";
import formatQuyen from "../../../../utils/formatQuyen";
import { sua } from "../../../../services/TaiKhoanAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";

const { Option } = Select;

function Sua(props) {
  const [form] = Form.useForm();

  const SuaTaiKhoan = async (values) => {
    values.id = props.taiKhoan.id
    const data = await sua(values);
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
      NotifySuccess("Sửa tài khoản thành công");
      const newDs = [...props.dsTaiKhoan]
      newDs[props.index].tennguoidung = values.tennguoidung;
      newDs[props.index].email = values.email;
      newDs[props.index].sodienthoai = values.sodienthoai;
      newDs[props.index].idquyen = values.idquyen;
      props.setDsTaiKhoan(newDs)
      props.setChucNang('')
    }
  };
  return (
    <div
      className="Sua"
      onClick={(e) => {
        if (e.target.className === "Sua") {
          props.setChucNang("");
        }
      }}
    >
      <div className="Sua_content">
        <Form
          onFinish={(values) => {
            SuaTaiKhoan(values);
          }}
          layout="vertical"
          form={form}
          initialValues={
            {
              tennguoidung: props.taiKhoan.tennguoidung,
              email: props.taiKhoan.email,
              sodienthoai: props.taiKhoan.sodienthoai,
              idquyen: props.taiKhoan.idquyen,
            }
          }
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
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Sua;
