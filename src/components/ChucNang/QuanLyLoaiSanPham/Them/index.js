import { Form, Button, Input } from "antd";
import "./Them.css";
import { them } from "../../../../services/LoaiSanPhamAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";

function Them(props) {
  const [form] = Form.useForm();

  const themLoaiSanPham = async (values) => {
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
      NotifySuccess("Thêm loại sản phẩm thành công");
      const newDs = [...props.dsLoaiSanPham]
      values.id = data.loaiSanPham
      newDs.push(values)
      props.setDsLoaiSanPham(newDs)
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
            themLoaiSanPham(values);
          }}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Tên"
            name="ten"
            rules={[
              { required: true, message: " Vui lòng nhập tên loại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="mota"
          >
            <Input />
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
