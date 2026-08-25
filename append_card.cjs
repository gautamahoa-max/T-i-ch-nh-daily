const fs = require('fs');
let code = fs.readFileSync('src/data/cardDetails.js', 'utf8');

const newCard = `
  6: { // MASTERCARD PLATINUM
    sections: [
      {
        title: "Phí thường niên",
        items: [
          "Thẻ chính: 999.000 VND",
          "Thẻ phụ: Miễn phí (đối với thẻ phát hành từ 01/01/2025 trở đi)"
        ]
      },
      {
        title: "Hạn mức giao dịch/ngày",
        items: [
          "500 triệu đồng"
        ]
      },
      {
        title: "Ưu đãi mở thẻ (*)",
        items: [
          "Hoàn 100% phí thường niên năm đầu khi chi tiêu tổng doanh số giao dịch hợp lệ đạt 3 triệu đồng trong 45 ngày đầu tiên mở thẻ."
        ]
      },
      {
        title: "Ưu đãi áp dụng cho tất cả chủ thẻ (*)",
        items: [
          "Tổng chi tiêu/kỳ xét thưởng đạt từ 30 triệu trở lên: Hoàn 15% cho giao dịch mua sắm công nghệ (tại Thế Giới Di Động, Điện Máy Xanh, Topzone, Cellphones, Di Động Việt, FPT Shop), tối đa 1.200.000 VND. Hoàn 15% giao dịch chi tiêu làm đẹp (Thời trang, Spa, Gym,…), tối đa 300.000 VND. Hoàn tối đa 1.500.000 VND/kỳ xét thưởng.",
          "Tổng chi tiêu/kỳ xét thưởng đạt dưới 30 triệu: Hoàn 7% cho giao dịch mua sắm công nghệ (tại Thế Giới Di Động, Điện Máy Xanh, Topzone, Cellphones, Di Động Việt, FPT Shop), tối đa 600.000 VND. Hoàn 7% giao dịch chi tiêu làm đẹp (Thời trang, Spa, Gym,…), tối đa 300.000 VND. Hoàn tối đa 700.000 VND/kỳ xét thưởng.",
          "Ghi chú: Chủ thẻ cần chi tiêu hợp lệ từ 7 giao dịch/kỳ xét thưởng để được hoàn tiền. Kỳ xét thưởng được tính theo tháng dương lịch trong năm."
        ]
      }
    ]
  }
};
`;

code = code.replace(/};\s*$/, ',' + newCard);
fs.writeFileSync('src/data/cardDetails.js', code);
