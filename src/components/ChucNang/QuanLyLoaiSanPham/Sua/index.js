import { Form, Button, Input } from "antd";
import "./Sua.css";
import { sua } from "../../../../services/LoaiSanPhamAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";


function Sua(props) {
  const [form] = Form.useForm();

  const SuaLoaiSanPham = async (values) => {
    values.id = props.loaiSanPham.id
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
      NotifySuccess("Sửa loại sản phẩm thành công");
      const newDs = [...props.dsLoaiSanPham]
      newDs[props.index].ten = values.ten;
      newDs[props.index].mota = values.mota;
      props.setDsLoaiSanPham(newDs)
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
            SuaLoaiSanPham(values);
          }}
          layout="vertical"
          form={form}
          initialValues={
            {
              ten: props.loaiSanPham.ten,
              mota: props.loaiSanPham.mota,
            }
          }
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
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Sua;
