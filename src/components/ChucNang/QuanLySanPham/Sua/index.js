import { Form, Button, Input, Select } from "antd";
import "./Sua.css";
import { sua } from "../../../../services/SanPhamAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

function Sua(props) {
  const [form] = Form.useForm();

  const SuaSanPham = async (values) => {
    values.id = props.sanPham.id
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
      const newDs = [...props.dsSanPham]
      newDs[props.index].idloaisanpham = values.idloaisanpham;
      newDs[props.index].ten = values.ten;
      newDs[props.index].dongia = values.dongia;
      newDs[props.index].mota = values.mota;
      props.setDsSanPham(newDs)
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
            SuaSanPham(values);
          }}
          layout="vertical"
          initialValues={{
            ten: props.sanPham.ten,
            dongia: props.sanPham.dongia,
            linkanh: "https://google.driver/3/u/my-driver/images/1293189273218.ipg",
            idloaisanpham: props.sanPham.idloaisanpham,
          }}
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
          >
            <TextArea rows={4} placeholder="Nhập nội dung tại đây..." />
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
