import { Form, Button, Input, Select } from "antd";
import "./Them.css";
import { them } from "../../../../services/SanPhamAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

function Them(props) {
  const [form] = Form.useForm();

  const themSanPham = async (values) => {
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
      NotifySuccess("Thêm sản phẩm thành công");
      const newDs = [...props.dsSanPham];
      values.id = data.sanPham;
      newDs.push(values);
      props.setDsSanPham(newDs);
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
            themSanPham(values);
          }}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="ten"
            rules={[
              { required: true, message: " Vui lòng nhập Tên sản phẩm!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Đơn giá"
            name="dongia"
            rules={[{ required: true, message: " Vui lòng nhập Đơn giá!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Link ảnh"
            name="linkanh"
            rules={[{ required: true, message: " Vui lòng nhập Link ảnh!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="idloaisanpham"
            rules={[{ required: true, message: "Vui chọn Quyền!" }]}
          >
            <Select style={{ width: "100%" }}>
              {props.dsLoaiSanPham.map((item, index) => {
                return (
                  <Option value={item.id}>
                    <p>{item.ten}</p>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="mota"
            rules={[
              { required: true, message: " Vui lòng nhập Mô tả!" },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập nội dung tại đây..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                marginTop: "10px",
                backgroundColor: "var(--primary-color)",
              }}
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
