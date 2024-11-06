import "./NhanDon.css";
import { layDanhSach } from "../../../services/DonHangAPI";
import { useEffect, useState } from "react";
import DanhSachDonHang from "../../components/DanhSachDonHang";
import ThongBaoTrong from "../../components/ThongBaoTrong";
import { layTaiKhoan } from "../../../services/TaiKhoanAPI";

function NhanDon(props) {
  const [dsDonHang, setDsDonHang] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await layDanhSach();
      if (data.dsDonHang) {
        const newDs = [];
        for (let x of data.dsDonHang) {
          if (x.trangthai === "30" && props.nguoidung.idquyen === 0) {
            const data = await layTaiKhoan({ id: x.idmanguoidung });
            if (data.taiKhoan) {
              x.nguoidat = `${data.taiKhoan.tennguoidung} - ${data.taiKhoan.id}`;
              newDs.push(x);
            }
          } else if(x.trangthai === "10" && props.nguoidung.idquyen === 2) {
            newDs.push(x)
          }
        }
        setDsDonHang(newDs);
      }
    })();
  }, [props]);

  

  return (
    <div className="NhanDon">
      <div className="NhanDon_content">
        <h2>Nhận đơn</h2>
        {dsDonHang.length === 0 ? (
          <ThongBaoTrong message="Chưa có đơn hàng nào" />
        ) : (
          <DanhSachDonHang
            dsDonHang={dsDonHang}
            setDsDonHang={setDsDonHang}
            option={props.option}
          />
        )}
      </div>
    </div>
  );
}

export default NhanDon;
