const fs = require('fs');

let footerContent = fs.readFileSync('src/components/Footer.jsx', 'utf8');

footerContent = footerContent.replace(
  'Ngân hàng TMCP Phương Đông (OCB) được thành lập từ năm 1996. Kiến tạo chuẩn mực tài chính mới.',
  'Blog chia sẻ các sản phẩm thẻ tín dụng của OCB'
);

fs.writeFileSync('src/components/Footer.jsx', footerContent);
console.log("Footer text updated.");
